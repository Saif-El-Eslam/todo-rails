# app/subscribers/message_subscriber.rb
class MessageSubscriber
    def initialize
      @connection = Bunny.new
      @connection.start
      @channel = @connection.create_channel
      @exchange = @channel.topic('messages')
      @queue = @channel.queue('message_queue', durable: true)
      @queue.bind(@exchange, routing_key: 'message.new')
    end
  
    def subscribe
      @queue.subscribe do |delivery_info, properties, payload|
        puts "Received: #{payload}"
        # Process the message here
      end
    end
  
    def close
      @connection.close
    end
  end
  