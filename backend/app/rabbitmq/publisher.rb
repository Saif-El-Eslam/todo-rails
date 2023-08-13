require 'bunny'

connection = Bunny.new
connection.start

channel = connection.create_channel  

message = ARGV.empty? ? 'Hello World!' : ARGV.join(' ')

queue = channel.queue('hello')
channel.default_exchange.publish(message, routing_key: queue.name)

queue2 = channel.queue('hello2')
channel.default_exchange.publish(message, routing_key: queue2.name)

puts " [x] Sent '#{message}'"

connection.close
