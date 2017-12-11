class Comment < ApplicationRecord
  private

  # Validates `parent` making sure that the comment being replied to has the same
  # project_id as the comment itself
  def non_conflicting_parent_and_project
    if parent && parent.project != project
      errors.add(:parent, "parent comment project doesn't match project")
    end
  end

  public

  belongs_to :user, optional: true
  belongs_to :project
  belongs_to :parent, foreign_key: "comment_id", class_name: "Comment", optional: true
  has_many :replies, foreign_key: "comment_id", class_name: "Comment", dependent: :destroy
  has_many :likes, dependent: :destroy

  validates_presence_of :project_id, :content
  validates_length_of :content, minimum: 5

  validate :non_conflicting_parent_and_project

  def number_of_likes
    likes.length
  end

  def is_liked_by(user)
    return false unless user
    likes.pluck(:user_id).include?(user.id)
  end

  def is_top_level
    parent.nil?
  end

  # Returns a json representation of a comment necessary for react generation of 
  # the comment section
  def as_json_for_react(current_user)
    comment_json = as_json(only: [:user_id, :content, :id])
    comment_json[:is_liked] = is_liked_by(current_user)
    comment_json[:likes] = likes.count
    comment_json[:user_full_name] = user.full_name
    comment_json[:replies] = replies.each_with_object([]) do |reply, replies_array|
      reply_json = reply.as_json(only: [:user_id, :content, :id])
      reply_json[:is_liked] = reply.is_liked_by(current_user)
      reply_json[:likes] = reply.likes.count
      reply_json[:user_full_name] = reply.user.full_name
      replies_array << reply_json
    end

    comment_json
  end  
end