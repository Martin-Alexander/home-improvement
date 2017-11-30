class ProjectPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    user_can_see_project?
  end

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
      if (user && user.admin)
        scope.all
      else
        scope.where("private = ? OR user_id = ?", false, (user.id rescue nil))
      end
    end
  end

  private

  def user_is_owner?
    @record.user == user
  end

  def user_can_see_project?
    (user && user.admin) || !@record.private || user_is_owner?
  end
end
