class Interest < ApplicationRecord
    # An Interest can have multiple Events.
    # An Interest has many Events.
    has_many :events
end
