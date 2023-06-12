# Event Manager Application

## Description
This is an event management application that allows users to view events on a Google Map. It also provides an interactive platform where users can review and attend events. It is built using Ruby on Rails for the backend, with a PostgreSQL database, and the frontend uses React.js.

## Live Demo
You can visit the application at [https://eventmanagement-o5zg.onrender.com](https://eventmanagement-o5zg.onrender.com)

## Features
1. **User Authentication**: Allows users to register and login to the application.
2. **Google Map Integration**: Displays all events on a Google Map.
3. **Event Management**: Users can create, view, update, and delete events.
4. **Attend Event**: Users can attend events and their attendance is saved in the database.
5. **Review Event**: Users can review events, with their reviews being saved and displayed to other users.

## Local Installation Instructions
1. Clone the repository to your local machine.
```bash
git clone https://github.com/yourgithubusername/event-manager-application.git
Navigate to the directory of the cloned repository.
bash
Copy code
cd event-manager-application
Install all necessary packages for the backend.
bash
Copy code
bundle install
Install all necessary packages for the frontend.
bash
Copy code
npm install
Setup the database.
bash
Copy code
rails db:create db:migrate
Start the Rails server.
bash
Copy code
rails s
In another terminal window, navigate to the frontend directory and start the React server.
bash
Copy code
cd client
npm start
The application should now be running at http://localhost:3000.

Database Schema
The application uses four main models: User, Event, Review, and UserEvent.

Users have many Events (through UserEvents) and many Reviews.
Events belong to Users and have many Users (through UserEvents) and many Reviews.
Reviews belong to Users and Events.
UserEvents belong to Users and Events.
