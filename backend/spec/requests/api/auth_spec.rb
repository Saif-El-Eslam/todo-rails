require 'swagger_helper'

RSpec.describe 'api/auth', type: :request do

  path '/api/login' do

    post('login auth') do
      tags 'Login user'
      description 'Login user'
      consumes 'application/json'
      produces 'application/json'

      parameter name: :user, in: :body, schema: {
        type: :object,
        properties: {
          username: { type: :string, example: 'testswag' },
          password: { type: :string, example: 'testswag' }
        },
        required: [ 'username', 'password' ]
      }

      response(200, 'successful') do
        let(:user) { { username: 'testswag', password: 'testswag' } }

        schema type: :object,
          properties: {
            user: { type: :object,
              properties: {
                _id: { 
                  type: :object,
                  properties: {
                    "$oid": { type: :string, example: '650f12afb735f833a03bd5e8' }
                  },
                 },
                created_at: { type: :string, example: '2023-09-23T16:30:39.049Z' },
                username: { type: :string, example: 'testswag' },
                email: { type: :string, example: 'testswag@example.com' },
                token: { type: :string, example: 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjp7IiRvaWQiOiI2NTBmMTJhZmI3MzVmODMzYTAzYmQ1ZTgifX0.5BJFWG655dVFFdapFpf8db0LS2asPNGvtaZgnf1rmps' },
                updated_at: { type: :string, example: '2023-09-23T16:30:39.049Z' },
              },
              required: [ 'id', 'username', 'email', 'password_digest', 'token' ]
            }
          },
          required: [ 'user' ]
        
        run_test!
      end

      response(401, 'invalid username or password') do
        let(:user) { { username: 'testswag', password: 'testswag1' } }

        schema type: :object,
          properties: {
            error: { type: :string, example: 'Invalid username or password' }
          },
          required: [ 'error' ]
        
        run_test!
      end

    end
  end

  path '/api/logout' do
    post('logout auth') do
      tags 'Logout user'
      description 'Logout user'
      consumes 'application/json'
      produces 'application/json'
  
      security [bearerAuth: []]

      response(200, 'successful') do
        schema type: :object,
          properties: {
            message: { type: :string, example: 'Successfully logged out' }
          },
          required: ['message']

          header 'Authorization', description: 'Bearer token', type: 'JWT', required: true 
  
        run_test!
      end

      response(401, 'invalid token') do
        schema type: :object,
          properties: {
            error: { type: :string, example: 'Invalid token' }
          },
          required: ['error']

          header 'Authorization', description: 'Bearer token', type: 'JWT', required: true 
  
        run_test!
      end
    end
  end
end
