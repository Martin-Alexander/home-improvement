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
end
