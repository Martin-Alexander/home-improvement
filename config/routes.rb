Rails.application.routes.draw do
  root to: "projects#index"

  ActiveAdmin.routes(self)

  devise_for :users, controllers: { omniauth_callbacks: 'facebook_omniauth_callbacks' }

  resources :projects
  resources :comments, only: [:index, :create, :update, :destroy]
  resources :likes, only: [:create, :destroy]
end
