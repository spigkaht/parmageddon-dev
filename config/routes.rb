Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
  root to: "pages#index"

  resources :venues, only: [:show, :new, :create, :edit, :update, :destroy] do
    resources :parmas, only: [:show, :new, :create, :edit, :update, :destroy] do
      resources :reviews, only: [:new, :create, :edit, :update, :destroy]
    end
  end

  resources :parmas, only: [:index]
  resources :polls, only: [:index, :new, :create]
  get "/map", to: "pages#map", as: "map"
  post "/map", to: "pages#search"
  get "reset_session_map", to: "pages#reset_session_map"
end
