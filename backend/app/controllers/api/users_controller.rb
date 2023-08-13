require_relative '../../gen/pb_ruby/hello_services_pb'
require 'grpc'

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

    # an end point that talks to the grpc server
    def say_hello
        stub = Hello::HelloService::Stub.new('localhost:50051', :this_channel_is_insecure)
        
        user = params[:username]
        message = stub.say_hello(Hello::HelloRequest.new(name: user)).message
        render json: {message: message}
    end

    private
    def user_params
        params.permit(:username, :email, :password);
    end
    
end
