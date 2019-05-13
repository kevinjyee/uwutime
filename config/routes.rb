Rails.application.routes.draw do
  get 'pages/root'
  # These routes will be for signup. The first renders a form in the browse, the second will
  # receive the form and create a user in our database using the data given to us by the user.
  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/scheduler' => "pages#root"
  get '/administration' => "pages#root"
  get '/administration/mash_profiles' => "pages#root"
  get '/administration/vessels' => "pages#root"
  get '/administration/profiles' => "pages#root"
  get '/administration/profile/:id' => "pages#root"
  get '/recipe_list' => "pages#root"
  root to: "pages#root"
  resources :schedule_requests
  post '/schedule_requests/bulk_update' => 'schedule_requests#bulk_update'
  resources :vessels
  resources :schedule_profiles
  resources :recipes
end
