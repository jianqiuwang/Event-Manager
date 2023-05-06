# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
puts "🌱 Seeding data..."
# Users
user1 = User.create(username: "Alice", password: "password1")
user2 = User.create(username: "Bob", password: "password2")
user3 = User.create(username: "Charlie", password: "password3")
user4 = User.create(username: "Diana", password: "password4")

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
  user_id: user1.id
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
  user_id: user2.id
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
  user_id: user3.id
)

event4 = Event.create!(
  name: "Lollapalooza",
  description: "An annual 4-day music festival based in Chicago, Illinois at Grant Park.",
  location: "Grant Park, Chicago, Illinois",
  start_time: DateTime.parse("2023-07-28"),
  end_time: DateTime.parse("2023-07-31"),
  latitude: 41.8722,
  longitude: -87.6188,
  image_url: "https://lollaindia.com/assets/images/legacy-banner11.png",
  user_id: user4.id
)

event5 = Event.create!(
  name: "Comic-Con International",
  description: "A multi-genre entertainment and comic book convention held annually in San Diego, California.",
  location: "San Diego Convention Center, San Diego, California",
  start_time: DateTime.parse("2023-07-20"),
  end_time: DateTime.parse("2023-07-23"),
  latitude: 32.7065,
  longitude: -117.1619,
  image_url: "https://lajolla.com/wp-content/uploads/2018/07/cc-1.jpg",
  user_id: user1.id
)

# UserEvents
user_event1 = UserEvent.create(user_id: user1.id, event_id: event1.id)
user_event2 = UserEvent.create(user_id: user1.id, event_id: event2.id)
user_event3 = UserEvent.create(user_id: user2.id, event_id: event1.id)
user_event4 = UserEvent.create(user_id: user2.id, event_id: event3.id)

# Reviews
review1 = Review.create(user_id: user1.id, event_id: event1.id, rating: 5, comment: "Amazing event!")
review2 = Review.create(user_id: user1.id, event_id: event2.id, rating: 4, comment: "Great event, but it was a bit crowded.")



puts "🌱 Done seeding!"