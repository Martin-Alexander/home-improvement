class LikePolicy < ApplicationPolicy
  def create?
    true
  end

  def destroy?
    user_is_owner?
  end  

  class Scope < Scope
    def resolve
      scope
    end
  end

  private

  def user_is_owner?
    @record.user == user
  end
end
