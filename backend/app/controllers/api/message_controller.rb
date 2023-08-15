# app/controllers/messages_controller.rb
class Api::MessageController < ApplicationController
  def create
    message = params[:message]
    publisher = MessagePublisher.new
    publisher.publish(message)
    publisher.close
    render json: { message: 'Message sent successfully' }
  end
end
