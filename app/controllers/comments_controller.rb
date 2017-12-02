class CommentsController < ApplicationController
  before_action :set_comment, except: [:index, :create]
  before_action :authorize_comment, except: [:index, :create]

  def index
    @project = Project.find(params[:project_id])

    # Only top-level commments of selected project (with safeguard against showing
    # comments of private projects)
    project_comments = policy_scope(Comment)
      .joins(:project).where(comment_id: nil, projects: {private: false}, project: @project)

    case params[:filter]

    # Comments in reverse cronological order
    when "new"
      @comments = project_comments.order(created_at: :desc)

    # Comments in order of most likes
    when "top"
      @comments = project_comments.select("comments.*, COUNT(*) as like_count")
        .joins("LEFT JOIN likes ON likes.comment_id = comments.id ")
        .group("comments.id")
        .order("like_count DESC")

    # Comments in order of most comments
    when "active"
      @comments = project_comments.select("comments.*, COUNT(_comments.*) as comment_count")
        .joins("LEFT JOIN comments _comments ON _comments.comment_id = comments.id")
        .group("comments.id")
        .order("comment_count DESC")
    end
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
