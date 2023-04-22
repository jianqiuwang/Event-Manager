class Event < ApplicationRecord
  belongs_to :interest
  # An Event can have multiple Users attending.
  # An Event belongs to an Interest (category).
  # An Event has many UserEvents (the join model).
  # An Event has many Users through UserEvents.
  has_many :user_events, dependent: :destroy
  has_many :users, through: :user_events

  validates :latitude, presence: true
  validates :longitude, presence: true
end
