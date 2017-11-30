class LikesController < ApplicationController
  def create
    @like = Like.new(user: current_user, comment: params[:comment_id])
    authorize @like
    @like.save
  end

  def destroy
    @like = Like.find(params[:comment_id]).destroy
    authorize @like
    @like.destroy
  end
end
