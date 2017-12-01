class CommentsController < ApplicationController
  before_action :set_comment, except: [:index, :create]
  before_action :authorize_comment, except: [:index, :create]

  def index
    
  end

  def create
    @comment = Comment.new(comment_params)
    @comment.user = current_user

    authorize_comment

    unless @comment.save
      render json: @comment.error, status: :unprocessable_entity
    end
  end

  def update
    unless params[:comment] && @comment.update(content: params[:comment][:content])
      render json: @comment.error, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
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
