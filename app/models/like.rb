class Like < ApplicationRecord
  belongs_to :user
  belongs_to :comment

  validates_uniqueness_of :user, scope: :comment

  def project
    comment.project
  end
end
