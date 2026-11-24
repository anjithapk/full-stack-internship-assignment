
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todoRoutes");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("To-Do API is running!");
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
