class Event < ApplicationRecord
  has_many :user_events, dependent: :destroy
  has_many :users, through: :user_events
  has_many :reviews, dependent: :destroy
  
  validates :latitude, presence: true
  validates :longitude, presence: true
end
