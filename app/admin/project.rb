ActiveAdmin.register Project do
  permit_params :name, :description

  index do
    selectable_column
    column do |project|
      project.user.full_name
    end
    column :name
    column :description
    column :private
    column :estimated_level_of_effort
    column :actual_level_of_effort
    column :status
    actions
  end

  form do |f|
    f.inputs do
      f.input :name
      f.input :description
    end
    f.actions
  end

end
