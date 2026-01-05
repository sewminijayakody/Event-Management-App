# Event Management App 

A simple full-stack app to create, view, update, delete events and see overlapping events. Made as a software engineering assignment.

# Tech Stack 

Frontend: React.js

Backend: Node.js + Express

Database: MongoDB Atlas

Testing: Jest + Supertest

# Features 

Add events (title, start/end time, optional description)

Edit / Delete events

View overlapping events

Validation + error messages

Backend API (6 endpoints)

# Setup & Run 

Clone repo

git clone https://github.com/sewminijayakody/Event-Management-App.git 
cd event-management


# Backend

cd backend
npm install


Add .env:

MONGO_URI=mongodb+srv://dbuser12:dbuserpass12@cluster02.iog73et.mongodb.net/event-management
PORT=5000


# Frontend

cd ../frontend
npm install
npm start


Frontend: http://localhost:3000

Backend: http://localhost:5000/api/events

# Run Tests 
cd backend
npm test


Runs all unit and integration tests

Notes 📝

Uses MongoDB Atlas, no local DB used in here

Focus is on functionality and I used minimal styling

Overlap detection algorithm is simple but works for a small number of events

This is my Event Management app and fully working with tests and validation.