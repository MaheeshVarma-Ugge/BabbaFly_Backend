# BabbaFly Backend API

## Project Overview

The BabbaFly Backend is a RESTful API developed using **Node.js**, **Express.js**, and **MongoDB**.

This project manages the backend operations of the BabbaFly application, including:

- User Authentication
- Listings Management
- Categories
- Orders
- JWT Authentication
- Input Validation
- MongoDB Database Integration

The backend follows the **MVC (Model-View-Controller)** architecture to keep the project organized, scalable, and easy to maintain.

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- Joi Validation
- dotenv
- Helmet
- Morgan
- CORS

---

# Project Features

### User Module

- User Registration
- User Login
- JWT Authentication
- Get User Profile
- Update User Details

---

### Listings Module

- Create Listing
- View All Listings
- View Single Listing
- Update Listing
- Delete Listing

Supports:

- Filter by Price
- Filter by Location
- Sort by Latest
- Sort by Lowest Price
- Sort by Highest Price
- Sort by Popular

---

### Categories Module

- Get All Categories
- Get Listings by Category

---

### Orders Module

- Place Order
- View User Orders
- View Order Details

---

# Folder Structure

```
BabbaFly-Backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── userController.js
│   ├── listingController.js
│   ├── categoryController.js
│   └── orderController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Listing.js
│   ├── Category.js
│   └── Order.js
│
├── routes/
│   ├── userRoutes.js
│   ├── listingRoutes.js
│   ├── categoryRoutes.js
│   └── orderRoutes.js
│
├── validators/
│   ├── userValidator.js
│   ├── listingValidator.js
│   └── orderValidator.js
│
├── utils/
│   └── generateToken.js
│
├── .env
├── .gitignore
├── package.json
├── app.js
├── server.js
└── README.md
```

---

# How the Project Works

The project follows the MVC (Model-View-Controller) architecture.

### Step 1 - Client Request

The frontend or Postman sends an HTTP request to the backend.

Example:

```
POST /api/users/register
```

↓

### Step 2 - Routes

The request first reaches the **Routes** folder.

Routes decide which controller should handle the request.

↓

### Step 3 - Controller

The controller receives the request.

It:

- Validates the data
- Calls the database
- Performs business logic
- Sends the response

↓

### Step 4 - Model

The controller communicates with the MongoDB database through the Model.

Models define the database structure.

↓

### Step 5 - Database

MongoDB stores or retrieves the data.

↓

### Step 6 - Response

The controller sends a JSON response back to the frontend.

---

# Folder Explanation

## config/

Contains the MongoDB connection file.

---

## controllers/

Contains the business logic for Users, Listings, Categories, and Orders.

---

## middleware/

Contains authentication and error-handling middleware.

---

## models/

Defines MongoDB schemas using Mongoose.

---

## routes/

Maps API URLs to controller functions.

---

## validators/

Validates user input using Joi before processing requests.

---

## utils/

Contains helper functions such as JWT token generation.

---

# Installation

## 1. Clone the Repository

```bash
git clone <repository-url>
```

---

## 2. Open the Project

```bash
cd BabbaFly-Backend
```

---

## 3. Install Dependencies

```bash
npm install
```

---

## 4. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/babbafly

JWT_SECRET=babbafly_super_secret_key

JWT_EXPIRE=7d
```

---

## 5. Start MongoDB

Ensure MongoDB is running locally or connect using MongoDB Atlas.

---

## 6. Run the Project

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

---

# API Base URL

```
http://localhost:5000/api
```

---

# Available APIs

## Users

```
POST    /api/users/register

POST    /api/users/login

GET     /api/users/:id

PUT     /api/users/:id
```

---

## Listings

```
GET     /api/listings

GET     /api/listings/:id

POST    /api/listings

PUT     /api/listings/:id

DELETE  /api/listings/:id
```

Supports:

```
GET /api/listings?price=1000-5000

GET /api/listings?location=Hyderabad

GET /api/listings?sort=latest

GET /api/listings?sort=price_low

GET /api/listings?sort=price_high

GET /api/listings?sort=popular
```

---

## Categories

```
GET /api/categories

GET /api/categories/:id/listings
```

---

## Orders

```
POST /api/orders

GET /api/orders/user/:userId

GET /api/orders/:id
```

---

# Security Features

- Password Hashing using bcryptjs
- JWT Authentication
- Protected Routes
- Input Validation using Joi
- Centralized Error Handling
- Secure Environment Variables

---

# Database

MongoDB is used as the database.

Collections:

- Users
- Listings
- Categories
- Orders

---

# Testing

The APIs can be tested using:

- Postman
- Insomnia

---

# Future Improvements

- Image Upload
- Wishlist
- Reviews
- Payment Gateway Integration
- Admin Dashboard
- Email Verification
- Pagination
- Search API

---

# Conclusion

The BabbaFly Backend is a secure and scalable REST API built with Node.js, Express.js, and MongoDB. It follows the MVC architecture, provides authentication using JWT, validates requests with Joi, and supports CRUD operations for users, listings, categories, and orders. The project is designed to integrate easily with the BabbaFly frontend and serves as a strong foundation for a marketplace application.