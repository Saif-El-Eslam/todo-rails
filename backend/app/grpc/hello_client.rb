# app/hello_client.rb

require_relative '../gen/pb_ruby/hello_services_pb'
require 'grpc'

# Create a gRPC client
def main
  stub = Hello::HelloService::Stub.new('localhost:50051', :this_channel_is_insecure)

  user = 'Alice'
  message = stub.say_hello(Hello::HelloRequest.new(name: user)).message
  puts "Greeting: #{message}"
end

main
