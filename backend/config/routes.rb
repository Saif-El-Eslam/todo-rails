Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    post 'addTodo', action: :addTodo, controller: :todos
    delete 'deleteTodo/:todo_id', action: :deleteTodo, controller: :todos
    put 'updateTodo/:todo_id', action: :updateTodo, controller: :todos
    get 'getTodos', action: :getTodos, controller: :todos
    get 'getTodo/:todo_id', action: :getTodo, controller: :todos

    post 'login', action: :login, controller: :auth
    post 'logout', action: :logout, controller: :auth
    post 'signup', action: :signup, controller: :users

    post 'say_hello', action: :say_hello, controller: :users

  end

end
