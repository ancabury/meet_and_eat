Rails.application.routes.draw do
  resource :home, only: :index
  root to: 'home#index'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'sign_out', to: 'sessions#destroy', as: 'sign_out'

  resources :sessions, only: [:new, :create, :destroy]

  namespace :api do
    resources :users, only: [:index, :show]
    resources :requests, except: [:edit, :new, :show] do
      get :permissions, on: :member
    end
    resources :proposals, only: [:index, :create, :destroy] do
      get :accept, on: :member
      get :permissions, on: :member
    end
    resources :meal_dates
    resources :restaurants, only: [:index]
    resources :meal_times, only: :index
  end
end
