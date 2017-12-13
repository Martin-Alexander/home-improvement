class CommentsController < ApplicationController
  before_action :set_comment, only: [:update, :destroy]
  before_action :authorize_comment, only: [:update, :destroy]
  skip_before_action :authenticate_user!, only: [:index]

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user

    authorize_comment

    respond_to do |format|
      if @comment.save
        format.json { render json: {status: "OK", comment: @comment.as_json_for_react(current_user)} }
      else
        format.json { render json: {status: "FAILURE"} }
      end
    end
  end

  def update
    @comment.update(content: params[:comment][:content]) rescue false
  end

  def destroy
    # @comment = Comment.find(params[:comment_id])
    authorize @comment

    respond_to do |format|
      if @comment.destroy
        format.json { render json: {status: "OK"} }
      else
        format.json { render json: {status: "FAILURE"} }
      end
    end    
  end

  private

  def set_comment
    @comment = Comment.find(params[:id])
  end

  def authorize_comment
    authorize @comment
  end

  def comment_params
    params.require(:comment).permit(:comment_id, :project_id, :content)
  end
end
