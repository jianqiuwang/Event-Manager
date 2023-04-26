Rails.application.routes.draw do
  
  get 'sessions/create'
  get 'sessions/destroy'
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  resources :events
end
