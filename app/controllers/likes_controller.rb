class LikesController < ApplicationController
  def create
    @like = Like.new(user: current_user, comment_id: params[:comment_id])
    authorize @like
    
    respond_to do |format|
      if @like.save
        format.json { render json: { status: "OK" } }
      else
        format.json { render json: { status: "FAILURE" } }
      end
    end
  end

  def destroy
    @like = Like.where(comment_id: params[:id], user: current_user).first.destroy
    authorize @like

    respond_to do |format|
      if @like.destroy
        format.json { render json: { status: "OK" } }
      else
        format.json { render json: { status: "FAILURE" } }
      end
    end
  end
end
