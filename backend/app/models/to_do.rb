class ToDo
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :description, type: String
  field :completed, type: Boolean, default: false
  field :user_id, type: String
  field :image, type: String

  validates :title, presence: true
  validates :user_id, presence: true
end
