# app/publishers/message_publisher.rb
class MessagePublisher
    def initialize
      @connection = Bunny.new
      @connection.start
      @channel = @connection.create_channel
      @exchange = @channel.topic('messages')
    end
  
    def publish(message)
      @exchange.publish(message, routing_key: 'message.new')
    end
  
    def close
      @connection.close
    end
  end
  