class CommentPolicy < ApplicationPolicy
  def create?
    true
  end

  def update?
    user_is_owner?
  end

  def destroy?
    user_is_owner?
  end  

  class Scope < Scope
    def resolve
      scope.joins(:project).where(project: { private: false })
    end
  end

  private

  def user_is_owner?
    @record.user == user
  end
end
