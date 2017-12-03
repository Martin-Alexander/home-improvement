class CommentPolicy < ApplicationPolicy
  def create?
    true
  end

  def update?
    user_is_owner?
  end

  def destroy?
    user_is_owner? || user_is_admin?
  end  

  class Scope < Scope
    def resolve
      scope.all
    end
  end

  private

  def user_is_owner?
    @record.user == user
  end

  def user_is_admin?
    user.admin
  end
end
