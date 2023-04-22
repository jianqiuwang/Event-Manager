# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# Users
user1 = User.create(username: "Alice", email: "alice@example.com", password_digest: "password1")
user2 = User.create(username: "Bob", email: "bob@example.com", password_digest: "password2")

# Interests
interest1 = Interest.create(name: "Sports")
interest2 = Interest.create(name: "Music")
interest3 = Interest.create(name: "Technology")

# Events
event1 = Event.create(name: "Football Match", description: "A friendly football match.", location: "Stadium A", start_time: DateTime.now + 1.day, end_time: DateTime.now + 1.day + 2.hours)
event2 = Event.create(name: "Concert", description: "Live music concert.", location: "Music Hall", start_time: DateTime.now + 2.days, end_time: DateTime.now + 2.days + 3.hours)
event3 = Event.create(name: "Tech Conference", description: "Conference about latest tech trends.", location: "Convention Center", start_time: DateTime.now + 3.days, end_time: DateTime.now + 3.days + 8.hours)

# UserEvents
UserEvent.create(user_id: user1.id, event_id: event1.id)
UserEvent.create(user_id: user1.id, event_id: event2.id)
UserEvent.create(user_id: user2.id, event_id: event1.id)
UserEvent.create(user_id: user2.id, event_id: event3.id)
