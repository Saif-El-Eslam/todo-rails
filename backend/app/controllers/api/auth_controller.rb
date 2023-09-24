class Api::AuthController < ApplicationController
  # use JWT to authenticate user and return a token
  def login
    user = User.find_by(username: params[:username])
    if user && user.authenticate(params[:password])
      # use JWT to encode user_id
      token = create_token(user.id)
      user.set(:token => token)
      render json: {user: user.as_json(except: [:password_digest])}, status: 200
      return true
    else
      render json: {error: "Invalid username or password"}, status: 401
      return true
    end
  end

  # logout user by getting the user id from the token and deleting the token of this user
  def logout
    current_user_id = check_token["$oid"]

    user = User.find_by(id: current_user_id)
    
    if user
      if !user.token
        render json: {error: "Expired token"}, status: 401
        return true
      end
      user.set(:token => nil)
      render json: {message: "Successfully logged out"}, status: 200
      return true
    end
  end
  

end
