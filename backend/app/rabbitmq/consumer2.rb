require 'bunny'

connection = Bunny.new
connection.start

channel = connection.create_channel
queue = channel.queue('hello2')


puts " [*] Waiting for messages in Consumer 2. To exit press CTRL+C"

begin
  queue.subscribe(block: true) do |delivery_info, _properties, body|
    puts " [x] Consumer 2 received #{body}"
  end
rescue Interrupt => _
  connection.close
  exit(0)
end
