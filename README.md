# Velocity Rentals - Bike Rental Portal

A full-stack modern bike rental platform built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **User Authentication**: Secure Login/Register with JWT.
- **Bike Listing**: Browse available bikes with filters (Location, Price, Name).
- **Bike Details**: View specs, images, description and availability.
- **Booking System**: Select dates and book bikes securely.
- **User Dashboard**: View booking history and status.
- **Admin Dashboard**: a
  - Manage Bikes (Add, Edit, Delete).
  - Manage Bookings (View statuses).
  - Upload Images.
- **Responsive Design**: Built with Tailwind CSS for mobile and desktop.

## distinct Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, React Router, Axios.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, Multer (Image Uploads).
- **Auth**: JWT (JSON Web Tokens), Bcryptjs.

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB (Local or Atlas)
  - **Local**: Make sure `mongod` is running.
  - **Docker**: If you have Docker Desktop running, you can start a MongoDB container:
    ```bash
    docker run -d -p 27017:27017 --name bike-rental-mongo mongo:latest
    ```

### 1. Backend Setup

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure Environment Variables:
   - The `.env` file is already created.
   - Default `MONGO_URI` is `mongodb://127.0.0.1:27017/bike-rental-portal`.
     - *Note*: If using Docker or facing connection issues, `127.0.0.1` is preferred over `localhost`.

4. Seed the Database (Requires running MongoDB):
   ```bash
   npm run data:import
   ```
   - *If this fails, ensure your database is running!*

5. Start the Server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:5001`.

### 2. Frontend Setup

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Development Server:
   ```bash
   npm run dev
   ```
   App runs on `http://localhost:5173`.

## Usage

1. Open `http://localhost:5173` in your browser.
2. Register a new account.
3. Login as Admin (check `backend/seeder.js` for credentials) to add bikes.
   - **Admin Email**: `admin@example.com`
   - **Password**: `password123`
4. Browse and book bikes as a regular user.

## Folder Structure

- `backend/` - API Server & Database Models
- `frontend/` - React Client Application

## License

MIT
