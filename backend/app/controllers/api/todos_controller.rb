class Api::TodosController < ApplicationController
  before_action :check_token, only: [:addTodo, :deleteTodo, :updateTodo, :getTodos, :getTodo]

  def addTodo
    current_user_id = check_token["$oid"]
    params[:user_id] = current_user_id
    
    user = User.find_by(id: params[:user_id])
    if !user.token
      render json: {error: "Invalid token"}, status: 401
      return true
    end
    
    todo = ToDo.new(todo_params)
    if todo.save
      render json: todo, status: 201
    else
      render json: {error: todo.errors.messages}, status: 404
    end
  end

  def deleteTodo
    current_user_id = check_token["$oid"]
    params[:user_id] = current_user_id

    user = User.find_by(id: params[:user_id])
    if !user.token
      render json: {error: "Invalid token"}, status: 401
      return true
    end

    todo = ToDo.find_by(user_id: params[:user_id], id: params[:todo_id])

    if !todo
      render json: {error: "Todo not found"}, status: 404
      return true
    end

    if todo.destroy
      render json: todo, status: 200
    else
      render json: {error: todo.errors.messages}, status: 404
    end
  end

  def updateTodo
    current_user_id = check_token["$oid"]
    params[:user_id] = current_user_id

    user = User.find_by(id: params[:user_id])
    if !user.token
      render json: {error: "Invalid token"}, status: 401
      return true
    end

    todo = ToDo.find_by(user_id: params[:user_id], id: params[:todo_id])

    if !todo
      render json: {error: "Todo not found"}, status: 404
      return true
    end

    if todo.update(todo_params)
      render json: todo, status: 200
    else
      render json: {error: todo.errors.messages}, status: 404
    end    
  end

  def getTodos
    current_user_id = check_token["$oid"]
    params[:user_id] = current_user_id

    user = User.find_by(id: params[:user_id])
    if !user.token
      render json: {error: "Invalid token"}, status: 401
      return true
    end

    todos = ToDo.where(user_id: params[:user_id])
    
    if todos.length == 0
      render json: {error: "No todos found"}, status: 404
      return true
    end

    render json: todos, status: 200
  end

  def getTodo
    current_user_id = check_token["$oid"]
    params[:user_id] = current_user_id
    
    user = User.find_by(id: params[:user_id])
    if !user.token
      render json: {error: "Invalid token"}, status: 401
      return true
    end

    todo = ToDo.find_by(user_id: params[:user_id], id: params[:todo_id])

    if !todo
      render json: {error: "Todo not found"}, status: 404
      return true
    end

    render json: todo, status: 200
  end

  private
  def todo_params
    params.permit(:title, :description, :completed, :image, :user_id);
  end
end
