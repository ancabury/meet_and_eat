Rails.application.routes.draw do
  resource :home, only: :index
  root to: 'home#index'

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'auth/failure', to: redirect('/')
  get 'sign_out', to: 'sessions#destroy', as: 'sign_out'

  resources :sessions, only: [:create, :destroy]

  namespace :api do
    resources :users, only: [:index, :show]
  end
end
