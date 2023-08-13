require 'bunny'

connection = Bunny.new
connection.start

channel = connection.create_channel
queue = channel.queue('hello')


puts " [*] Waiting for messages in Consumer 1. To exit press CTRL+C"

begin
  queue.subscribe(block: true) do |delivery_info, _properties, body|
    puts " [x] Consumer 1 received #{body}"
  end
rescue Interrupt => _
  connection.close
  exit(0)
end
