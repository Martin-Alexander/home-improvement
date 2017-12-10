class ProjectsController < ApplicationController
  before_action :set_project, except: [:index, :new, :create]
  before_action :authorize_project, except: [:index, :new, :create]
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    @projects = policy_scope(Project).order(created_at: :desc)
  end

  def show
    # @comments = policy_scope(Comment).where(project: @project, parent: nil).order(created_at: :desc)
    @comment_json = @project.as_json_for_react
  end

  def new
    @project = Project.new
    authorize_project
  end

  def create
    @project = Project.new(project_params)
    @project.user = current_user
    authorize_project
    if @project.save!
      redirect_to project_path(@project)
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @project.update(project_params)
      redirect_to project_path(@project)
    else
      render :edit
    end    
  end

  def destroy
    @project.destroy
    redirect_to projects_path
  end

  private

  def set_project
    @project = Project.find(params[:id])
  end

  def authorize_project
    authorize @project
  end

  def project_params
    params.require(:project).permit(:name, :description, :private, :status, :estimated_level_of_effort, :actual_level_of_effort)
  end
end
