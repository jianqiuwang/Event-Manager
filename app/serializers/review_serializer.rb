class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment, :username

  def username
    object.user.username
  end

  belongs_to :user
  belongs_to :event
end
