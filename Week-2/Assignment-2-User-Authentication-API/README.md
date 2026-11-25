# User Authentication API

## Overview
A REST API built using Node.js, Express.js and MongoDB to provide user registration and login functionality with secure password hashing and JWT authentication.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)

## Features
- User registration
- User login
- Password hashing using bcrypt
- JWT token generation
- Protected user profile route
- Authentication middleware

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login an existing user |
| GET | `/api/users/profile` | Access protected user profile |

## Setup Instructions

1. Install dependencies using `npm install`.
2. Create a `.env` file with the following variables:

```env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_private_secret
```

3. Start the development server:

```bash
npm run dev
```

The API runs at `http://localhost:5001`.

## Testing
API endpoints were tested using Hoppscotch.

- Registration: 201 Created
- Login: 200 OK
- Protected route without token: 401 Unauthorized
- Protected route with valid token: 200 OK