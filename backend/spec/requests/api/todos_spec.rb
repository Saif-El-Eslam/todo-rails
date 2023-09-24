require 'swagger_helper'

RSpec.describe 'api/todos', type: :request do

  path '/api/addTodo' do    
    post('Add Todo') do
      tags 'Add todo'
      description 'Add todo'
      consumes 'application/json'
      produces 'application/json'
      security [bearerAuth: []]

      parameter name: :todo, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string, example: 'Buy milk' },
          description: { type: :string, example: 'Go to the store and buy milk' },
          completed: { type: :boolean, example: false },
          image: { type: :string, example: '/to_do/image/64cf8c64b735f8616093ceb2/image.png' },
          user_id: { type: :string, example: '650f12afb735f833a03bd5e8' }
        },
        required: [ 'title', 'user_id' ]
      }

      response(201, 'successful') do
        let(:todo) { { title: 'Buy milk', user_id: '650f12afb735f833a03bd5e8' } }

        schema type: :object,
          properties: {
            id: { type: :string, example: '123' },
            title: { type: :string, example: 'Buy milk' },
            description: { type: :string, example: 'Go to the store and buy milk' },
            completed: { type: :boolean, example: false },
            image: { type: :string, example: '/to_do/image/64cf8c64b735f8616093ceb2/image.png' },
            user_id: { type: :string, example: '650f12afb735f833a03bd5e8' }
          },
          required: [ 'id', 'title', 'user_id' ]
        
        run_test!
      end

      response(401, 'invalid token') do
        let(:todo) { { title: 'Buy milk', user_id: '650f12afb735f833a03bd5e8' } }

        schema type: :object,
          properties: {
            error: { type: :string, example: 'Invalid token' }
          },
          required: [ 'error' ]
        
        run_test!
      end

    end
  end

  path '/api/deleteTodo/{todo_id}' do
    delete('Delete Todo') do
      tags 'Delete todo'
      description 'Delete todo'
      consumes 'application/json'
      produces 'application/json'
      security [bearerAuth: []]

      # take the todo_id from the path
      parameter name: 'todo_id', in: :path, type: :string, description: 'todo_id'

      response(200, 'successful') do
        schema type: :object,
          properties: {
            id: { 
              type: :object,
              properties: {
                "$oid": { type: :string, example: '65103cc4b735f80a3cb196ce' }
             },
            },
            completed: { type: :boolean, example: false },
            created_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
            description: { type: :string, example: 'Go to the store and buy milk' },
            image: {
              type: :object,
              properties: {
                url: { type: :string, example: '/to_do/image/64cf8c64b735f8616093ceb2/image.png' }
              },
            },
            title: { type: :string, example: 'Buy milk' },
            updated_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
            user_id: { type: :string, example: '650f12afb735f833a03bd5e8' }
          },
          required: [ 'id', 'title', 'user_id' ]

        run_test!
      end

      response(401, 'invalid token') do
        schema type: :object,
          properties: {
            error: { type: :string, example: 'Invalid token' }
          },
          required: [ 'error' ]
        
        run_test!
      end

      response(404, 'todo not found') do
        schema type: :object,
          properties: {
            error: { type: :string, example: 'Todo not found' }
          },
          required: [ 'error' ]
        
        run_test!
      end
      
    end
    
  end

  path '/api/updateTodo/{todo_id}' do
    put('Update Todo') do
      tags 'Update todo'
      description 'Update todo'
      consumes 'application/json'
      produces 'application/json'
      security [bearerAuth: []]

      # take the todo_id from the path
      parameter name: 'todo_id', in: :path, type: :string, description: 'todo_id'

      parameter name: :todo, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string, example: 'Buy milk' },
          description: { type: :string, example: 'Go to the store and buy milk' },
          completed: { type: :boolean, example: false },
          image: { type: :string, example: '/to_do/image/64cf8c64b735f8616093ceb2/image.png' },
          user_id: { type: :string, example: '650f12afb735f833a03bd5e8' }
        },
        required: [ 'title', 'user_id' ]
      }

      response(200, 'successful') do
        let(:todo) { { title: 'Buy milk', user_id: '650f12afb735f833a03bd5e8' } }

        schema type: :object,
          properties: {
            id: { 
              type: :object,
              properties: {
                "$oid": { type: :string, example: '65103cc4b735f80a3cb196ce' }
             },
            },
            completed: { type: :boolean, example: false },
            created_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
            description: { type: :string, example: 'Go to the store and buy milk' },
            image: {
              type: :object,
              properties: {
                url: { type: :string, example: '/to_do/image/64cf8c64b735f8616093ceb2/image.png' }
              },
            },
            title: { type: :string, example: 'Buy milk' },
            updated_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
            user_id: { type: :string, example: '650f12afb735f833a03bd5e8' }
          },
          required: [ 'id', 'title', 'user_id' ]
        
        run_test!
      end

      response(401, 'invalid token') do
        let(:todo) { { title: 'Buy milk', user_id: '650f12afb735f833a03bd5e8' } }

        schema type: :object,
          properties: {
            error: { type: :string, example: 'Invalid token' }
          },
          required: [ 'error' ]
        
        run_test!
      end

      response(404, 'todo not found') do
        let(:todo) { { title: 'Buy milk', user_id: '650f12afb735f833a03bd5e8' } }

        schema type: :object,
          properties: {
            error: { type: :string, example: 'Todo not found' }
          },
          required: [ 'error' ]
        
        run_test!
      end
    end
  end

  path '/api/getTodos' do
    get('Get Todos') do
      tags 'Get todos'
      description 'Get todos'
      consumes 'application/json'
      produces 'application/json'
      security [bearerAuth: []]

      response(200, 'successful') do
        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { 
                type: :object,
                properties: {
                  "$oid": { type: :string, example: '65103cc4b735f80a3cb196ce' }
                },
              },
              completed: { type: :boolean, example: false },
              created_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
              description: { type: :string, example: 'Go to the store and buy milk' },
              image: {
                type: :object,
                properties: {
                  url: { type: :string, example: '/to_do/image/64cf8c64b735f8616093ceb2/image.png' }
                },
              },
              title: { type: :string, example: 'Buy milk' },
              updated_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
              user_id: { type: :string, example: '650f12afb735f833a03bd5e8' }
            },
            required: [ 'id', 'title', 'user_id' ]
          }

        run_test!
      end

      response(401, 'invalid token') do
        schema type: :object,
          properties: {
            error: { type: :string, example: 'Invalid token' }
          },
          required: [ 'error' ]
        
        run_test!
      end

      response(404, 'no todos found') do
        schema type: :object,
          properties: {
            error: { type: :string, example: 'No todos found' }
          },
          required: [ 'error' ]
        
        run_test!
      end
    end
  end

  path '/api/getTodo/{todo_id}' do
    get('get Todo') do
      tags 'Get todos'
      description 'Get todo'
      consumes 'application/json'
      produces 'application/json'
      security [bearerAuth: []]

      # take the todo_id from the path
      parameter name: 'todo_id', in: :path, type: :string, description: 'todo_id'

      response(200, 'successful') do
        schema type: :object,
          properties: {
            id: { 
              type: :object,
              properties: {
                "$oid": { type: :string, example: '65103cc4b735f80a3cb196ce' }
             },
            },
            completed: { type: :boolean, example: false },
            created_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
            description: { type: :string, example: 'Go to the store and buy milk' },
            image: {
              type: :object,
              properties: {
                url: { type: :string, example: '/to_do/image/64cf8c64b735f8616093ceb2/image.png' }
              },
            },
            title: { type: :string, example: 'Buy milk' },
            updated_at: { type: :string, example: '2023-09-24T13:42:28.417Z' },
            user_id: { type: :string, example: '650f12afb735f833a03bd5e8' }
          },
          required: [ 'id', 'title', 'user_id' ]

        run_test!
      end

      response(401, 'invalid token') do
        schema type: :object,
          properties: {
            error: { type: :string, example: 'Invalid token' }
          },
          required: [ 'error' ]
        
        run_test!
      end

      response(404, 'todo not found') do
        schema type: :object,
          properties: {
            error: { type: :string, example: 'Todo not found' }
          },
          required: [ 'error' ]
        
        run_test!
      end
    end
  end
end
