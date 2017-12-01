class LikesController < ApplicationController
  def create
    @like = Like.new(user: current_user, comment_id: params[:comment_id])
    authorize @like
    @like.save!
  end

  def destroy
    @like = Like.where(comment_id: params[:id], user: current_user).first.destroy
    authorize @like
    @like.destroy
  end
end
