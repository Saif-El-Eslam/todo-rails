class ApplicationController < ActionController::API
    SECRET_KEY = Rails.application.secrets.secret_key_base.to_s
    
    def create_token(user_id)
        payload = {user_id: user_id}
        return JWT.encode(payload, SECRET_KEY)
    end


    def check_token
        auth_header = request.headers['Authorization']
        if auth_header
            token = auth_header.split(' ')[1]

            begin
                decoded_token = JWT.decode(token, SECRET_KEY)
                return decoded_token[0]['user_id']
            rescue JWT::DecodeError
                render json: {error: "Invalid token"}, status: 401
                return { }
            end

        else
            render json: {error: "No token"}, status: 401
            return { }
        end
    end

end
