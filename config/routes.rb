Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "homes#index"
  resources :articles do
    collection do
      get :add_article_nested
    end
    member do
      get :edit_article_nested
    end
  end
end
