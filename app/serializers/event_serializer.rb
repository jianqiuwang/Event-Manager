class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :location, :start_time, :end_time, :latitude, :longitude, :image_url
  has_many :reviews
  has_many :user_events
end
