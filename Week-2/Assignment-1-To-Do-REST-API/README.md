# To-Do List REST API

## Overview
A RESTful API built using Node.js, Express.js, and MongoDB Atlas to manage to-do tasks.

## Technologies Used
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

## Features
- Create a new task
- Retrieve all tasks
- Update an existing task
- Delete a task

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/todos` | Create a task |
| GET | `/api/todos` | Get all tasks |
| PUT | `/api/todos/:id` | Update a task |
| DELETE | `/api/todos/:id` | Delete a task |

## Installation

1. Clone the repository.
2. Navigate to the `todo-rest-api` folder.
3. Run `npm install`.
4. Create a `.env` file with your MongoDB connection string:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

5. Start the development server:

```bash
npm run dev
```

## Testing
All CRUD operations were tested using Hoppscotch.
