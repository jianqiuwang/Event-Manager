Rails.application.routes.draw do
  resources :users, only: [:create, :show]
  resources :events do
    resources :reviews, only: [:index, :show, :create, :update, :destroy]
  end
  resources :reviews, only: [:index, :show, :create, :update, :destroy]
  resources :user_events, only: [:create, :destroy]

  get "/me", to: "users#show"
  post '/signup', to: 'users#create'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'
end
