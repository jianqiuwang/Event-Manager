class Event < ApplicationRecord
  has_many :user_events, dependent: :destroy
  has_many :users, through: :user_events
  has_many :reviews, dependent: :destroy
  
  validates :latitude, presence: true
  validates :longitude, presence: true

  validates :name, uniqueness: { scope: :start_time, message: "An event with the same name and start time already exists" }
end
