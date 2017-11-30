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
  validates_length_of :content, minimum: 20

  validate :non_conflicting_parent_and_project

  def number_of_likes
    likes.length
  end
end