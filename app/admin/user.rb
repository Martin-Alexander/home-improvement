ActiveAdmin.register User do
  actions :all, except: [:edit]

  index do
    selectable_column
    column :email
    column :admin
    column :first_name
    column :last_name
    actions
  end

  show do 
    attributes_table do
      row :email
      row :admin
      row :first_name
      row :last_name
      row :facebook_picture_url do |user|
        image_tag user.facebook_picture_url rescue nil 
      end
      row :last_sign_in_at
    end
  end
end
