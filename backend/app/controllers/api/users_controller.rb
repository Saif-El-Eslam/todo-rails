class Api::UsersController < ApplicationController
    def getUsers
        users = User.all
        render json: users
    end

    def signup
        user = User.new(user_params)
        if user.save
            render json: user, status: 201
        else
            render json: {error: user.errors.messages}, status: 404
        end
    end

    private
    def user_params
        params.permit(:username, :email, :password);
    end
    
end
