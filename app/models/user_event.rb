class UserEvent < ApplicationRecord
  # UserEvent is the join model that connects Users and Events.
  # A UserEvent belongs to a User.
  # A UserEvent belongs to an Event.
  belongs_to :user
  belongs_to :event
end
