require 'swagger_helper'

RSpec.describe 'api/user', type: :request do
    
    path '/api/signup' do
    
        post('register User') do
            tags 'Register user'
            description 'Register user'
            consumes 'application/json'
            produces 'application/json'
        
            parameter name: :user, in: :body, schema: {
            type: :object,
            properties: {
                    username: { type: :string, example: 'testswag' },
                    email: { type: :string, example: 'testswag@example.com' },
                    password: { type: :string, example: 'testswag' }
                },
                required: [ 'email', 'username', 'password' ]
            }

            response(201, 'successful') do
                let(:user) { { email: 'testswag@example.com', username: 'testswag', password: 'testswag' } }

                schema type: :object,
                    properties: {
                        id: { type: :string, example: '650f12afb735f833a03bd5e8' },
                        email: { type: :string, example: 'testswag@example.com' },
                        username: { type: :string, example: 'testswag' },
                        password: { type: :string, example: 'testswag' }
                    },
                    required: [ 'id', 'email', 'username', 'password' ]

                run_test!   
            end

            response(400, 'missing username') do
                let(:user) { { email: 'testswag@example.com', password: 'testswag' } }

                schema type: :object,
                    properties: {
                        error: { type: :string, example: {
                            "username": [
                              "can't be blank"
                            ]
                          } 
                        }
                    },
                    required: [ 'error' ]

                run_test!
            end

        end
    end
end
