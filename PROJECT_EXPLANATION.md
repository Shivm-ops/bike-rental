# Velocity Rentals - Project Documentation

## 1. Project Overview
**Velocity Rentals** is a full-stack web application designed to facilitate the rental of premium motorbikes. It serves two distinct user groups:
- **Customers**: Can browse the fleet, filter by preferences, view detailed specifications, and book bikes for specific dates.
- **Administrators**: Have full control over the platform, including managing the fleet (adding/editing/removing bikes), monitoring all bookings, and managing user accounts.

The project is built to be **production-ready**, featuring secure authentication, real-time database interactions, responsive design, and professional error handling.

---

## 2. Technology Stack & Rationale

We chose the **MERN Stack** (MongoDB, Express.js, React, Node.js) for this project. Here is a breakdown of why each technology was selected:

### Frontend (Client-Side)
- **React (w/ Vite)**: 
  - *Why*: React is the industry standard for building dynamic user interfaces. It allows us to create reusable components (like `BikeCard`, `Navbar`) that make the code modular and maintainable. Vite was used as the build tool for its lightning-fast start times and hot module replacement (HMR).
- **Tailwind CSS**: 
  - *Why*: A utility-first CSS framework that allows for rapid UI development without leaving the HTML. It ensures the design is consistent and fully responsive across mobile and desktop devices.
- **Framer Motion**: 
  - *Why*: Used to add subtle, professional animations (like page transitions or hover effects) that give the application a "premium" feel.
- **Axios**: 
  - *Why*: A promise-based HTTP client for making request to our backend API. It handles JSON data transformation and error handling better than the native `fetch` API.
- **React Router DOM**: 
  - *Why*: Manages navigation within the single-page application (SPA), allowing users to switch between "pages" (Home, Dashboard, Login) without refreshing the browser.

### Backend (Server-Side)
- **Node.js & Express.js**: 
  - *Why*: Node.js allows us to use JavaScript on the server, unifying the language across the entire stack. Express is a minimal framework that handles routing (`/api/bikes`, `/api/auth`) and middleware efficiently.
- **MongoDB & Mongoose**: 
  - *Why*: A NoSQL database that offers flexibility. Since bike specifications (like engine size, weight) might vary or change, a document-based store is ideal. Mongoose provides a rigorous schema to ensure data consistency.
- **JWT (JSON Web Tokens)**: 
  - *Why*: The standard for stateless authentication in SPAs. It securely transmits user identity between the client and server without needing session storage on the server.
- **Bcrypt.js**: 
  - *Why*: Essential security practice to hash passwords before storing them in the database. Even if the database is compromised, user passwords remain secure.
- **Multer**: 
  - *Why*: Middleware for handling `multipart/form-data`, used here to allow admins to upload images of bikes directly to the server.

---

## 3. Architecture & Workflow

### Folder Structure
The project is a **Monorepo** containing two distinct applications:
```
bike-rental/
├── backend/         # The Server API
│   ├── src/
│   │   ├── config/  # DB Connection
│   │   ├── controllers/ # Business Logic (what happens when a route is hit)
│   │   ├── middleware/  # Auth & Upload checks
│   │   ├── models/      # Mongoose Schemas (User, Bike, Booking)
│   │   └── routes/      # API Endpoint definitions
│   ├── uploads/     # Stored image files
│   └── server.js    # Entry point
│
└── frontend/        # The React Client
    ├── src/
    │   ├── components/ # Reusable UI pieces (Navbar, Footer)
    │   ├── context/    # Global State (AuthContext)
    │   ├── pages/      # Main views (Home, Dashboard)
    │   └── utils/      # Helpers (API axios instance)
```

### Data Flow
1.  **User Action**: A user clicks "Book Now" on the frontend.
2.  **API Call**: `Axios` sends a `POST` request to `http://localhost:5001/api/bookings`.
3.  **Security Check**: The Backend `authMiddleware` verifies the JWT token sent in the headers to ensure the user is logged in.
4.  **Processing**: The `bookingController` creates a new entry in **MongoDB**.
5.  **Response**: The server sends back a success message (JSON).
6.  **UI Update**: The React frontend updates the state to show "Booking Confirmed" and redirects the user to their Dashboard.

---

## 4. Key Features Implementation Details

### Authentication System
- We implemented a **Context API (`AuthContext.jsx`)** in React to hold the current user's state globally.
- When a user logs in, the backend issues a **JWT**.
- This token is stored in the browser's `localStorage` and automatically attached to every subsequent request using an Axios interceptor (`api.js`).

### Admin Privileges
- We have a middleware called `admin` in the backend.
- It checks `if (req.user && req.user.role === 'admin')`.
- Only if this passes can the request proceed to routes like `DELETE /api/bikes/:id`.
- On the frontend, Admin-only buttons (like "Edit Bike") are conditioned: `{user.role === 'admin' && <EditButton />}`.

### Image Handling
- Images are not stored in the database (which is bad practice for large files).
- Instead, they are saved to the `backend/uploads` folder using **Multer**.
- The database only stores the *path* to the image (e.g., `/uploads/bike1.jpg`).
- The Express server is configured to serve this folder statically so the frontend can load images via `http://localhost:5001/uploads/...`.

---

## 5. Development Journey

1.  **Initialization**: We started by setting up the folder structure and initializing `npm` projects for both sides.
2.  **Backend Core**: We built the `server.js` and connected it to a local MongoDB instance.
3.  **Models & Auth**: We defined what a "User" and "Bike" look like in code and secured the app with JWT.
4.  **Frontend Foundation**: We set up React with Tailwind CSS to ensure it looked good from day one.
5.  **Integration**: We connected the two sides, ensuring the frontend could fetch bikes and log users in.
6.  **Admin Features**: We added the ability for admins to upload images and manage the data.
7.  **Polish**: We added real-time feedback (toasts), loading states, and responsive layouts.
8.  **Debugging**: We resolved port conflicts (moving from 5000 to 5001) and Tailwind configuration issues to ensure a smooth runtime.

This project is now a complete, self-contained ecosystem demonstrating modern web development practices.
