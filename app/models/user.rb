class User < ApplicationRecord
  has_secure_password
#   A User can join multiple Events.
#   A User has many UserEvents (the join model).
#   A User has many Events through UserEvents.
  has_many :user_events, dependent: :destroy
  has_many :events, through: :user_events
  has_many :reviews, dependent: :destroy
end

