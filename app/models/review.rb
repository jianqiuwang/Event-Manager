class Review < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :rating, presence: true
  validates :comment, presence: true

  def username
    self.user.username
  end
end
