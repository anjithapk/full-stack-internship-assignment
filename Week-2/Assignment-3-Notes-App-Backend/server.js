
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.send("Notes App Backend is running!");
});

// Notes routes
app.use("/api/notes", noteRoutes);

// Start server
const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
