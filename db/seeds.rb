# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding data..."
# Users
user1 = User.create(username: "Alice", password_digest: "password1")
user2 = User.create(username: "Bob", password_digest: "password2")

# Interests
interest1 = Interest.create(name: "Sports")
interest2 = Interest.create(name: "Music")
interest3 = Interest.create(name: "Technology")

# Events
event1=Event.create!(
  name: "Coachella Valley Music and Arts Festival",
  description: "An annual music and arts festival held at the Empire Polo Club in Indio, California.",
  location: "Empire Polo Club, Indio, California",
  start_time: DateTime.parse("2023-04-14"),
  end_time: DateTime.parse("2023-04-23"),
  latitude: 33.6823,
  longitude: -116.2382,
  image_url: "https://www.concertaddicts.com/wp-content/uploads/2017/05/unnamed.jpg",
  interest: interest1
)

event2=Event.create!(
  name: "Boston Marathon",
  description: "The world's oldest annual marathon and one of the six World Marathon Majors.",
  location: "Boston, Massachusetts",
  start_time: DateTime.parse("2023-04-17"),
  end_time: DateTime.parse("2023-04-17"),
  latitude: 42.3601,
  longitude: -71.0589,
  image_url: "https://media1.popsugar-assets.com/files/thumbor/vCpKxfRurPpj8CvRq_CIr_ZJir8/fit-in/2048xorig/filters:format_auto-!!-:strip_icc-!!-/2023/04/17/789/n/1922729/tmp_X5Uyl0_4b64b5798d0bb66a_GettyImages-1482869799.jpg",
  interest: interest2
)

event3=Event.create!(
  name: "TED Conference",
  description: "An annual event that features a program of talks, workshops, and performances around the theme of 'ideas worth spreading'.",
  location: "Vancouver, British Columbia, Canada",
  start_time: DateTime.parse("2023-04-10"),
  end_time: DateTime.parse("2023-04-14"),
  latitude: 49.2827,
  longitude: -123.1207,
  image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeD-oXVDafdsQQwB08asGOdAD_CaYAzxB0UQ&usqp=CAU",
  interest: interest3
)



# UserEvents
UserEvent.create(user_id: user1.id, event_id: event1.id)
UserEvent.create(user_id: user1.id, event_id: event2.id)
UserEvent.create(user_id: user2.id, event_id: event1.id)
UserEvent.create(user_id: user2.id, event_id: event3.id)

puts "🌱 Done seeding!"