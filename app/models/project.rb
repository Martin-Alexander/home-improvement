class Project < ApplicationRecord
  private

  # Validates `actual_level_of_effort` and ensures that the status is not complete
  # without an acutal level of effor nor vice versa
  def actual_level_of_effort_only_on_completion
    if actual_level_of_effort.nil? && status == "completed"
      errors.add(:status, "must have actual level of effort if complete")
    elsif !actual_level_of_effort.nil?
      if !(1..10).to_a.include?(actual_level_of_effort) && status == "completed"
        errors.add(:actual_level_of_effort, I18n.t('errors.messages.inclusion'))
      elsif status != "completed"
        errors.add(:actual_level_of_effort, "cannot have actual level of effort if not complete")
      end
    end
  end

  public 

  Statuses = ["created", "started", "stopped", "completed"]

  belongs_to :user
  has_many :comments, dependent: :destroy

  validates_presence_of :name,
    :description,
    :estimated_level_of_effort,
    :status

  validates_length_of :name, minimum: 2
  # validates_length_of :description, minimum: 20, maximum: 1500
  validates_inclusion_of :private, in: [true, false]
  validates_inclusion_of :estimated_level_of_effort, in: 1..10
  validates_inclusion_of :status, in: Statuses
  
  validate :actual_level_of_effort_only_on_completion

  def number_of_comments
    comments.count
  end

  # Removes `completed` as an option and returns array with stylized and
  # well-formatted versions
  def self.statuses_as_select_options
    Project::Statuses
      .reject { |status| status == "completed" }
      .map { |status| [status.capitalize, status] }
  end

  # Returns a json representation of a project necessary for react generation of
  # the comment section
  def as_json_for_react
    project_hash = as_json(only: :id)
    project_hash[:comments] = Comment.includes(:user, :likes, replies: :user)
      .where(project_id: id, comment_id: nil)
      .each_with_object([]) { |comment, comments_array| comments_array << comment.as_json_for_react }

    project_hash
  end
end
