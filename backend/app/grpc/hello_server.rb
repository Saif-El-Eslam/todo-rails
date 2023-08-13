require 'grpc'
require_relative '../gen/pb_ruby/hello_services_pb'

class HelloServer < Hello::HelloService::Service
  def say_hello(request, _call)
    name = request.name
    response = Hello::HelloResponse.new(message: "Hello, #{name}!")
    response
  end
end


server = GRPC::RpcServer.new
server.add_http2_port('0.0.0.0:50051', :this_port_is_insecure)
server.handle(HelloServer)

server.run_till_terminated
