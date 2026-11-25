# Notes App Backend

## Overview
A REST API built using Node.js, Express.js and MongoDB to manage personal notes with JWT authentication.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

## Features
- Create notes
- Retrieve all personal notes
- Update notes
- Delete notes
- JWT authentication
- User-specific note access
- Protected API routes

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/notes` | Create a note |
| GET | `/api/notes` | Retrieve all notes |
| PUT | `/api/notes/:id` | Update a note |
| DELETE | `/api/notes/:id` | Delete a note |

All note endpoints require a valid Bearer token.

## Setup Instructions

1. Install dependencies using `npm install`.
2. Create a `.env` file:

```env
PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

3. Start the server:

```bash
npm run dev
```

The API runs at `http://localhost:5002`.

## Testing
API endpoints were tested using Hoppscotch.

- Create: 201 Created
- Retrieve: 200 OK
- Update: 200 OK
- Delete: 200 OK
- Without JWT token: 401 Unauthorized