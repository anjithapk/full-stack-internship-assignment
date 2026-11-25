
const express = require("express");
const router = express.Router();

const protect = require("../config/authMiddleware");

const {
    createNote,
    getNotes,
    updateNote,
    deleteNote
} = require("../controllers/noteController");

// All routes require authentication
router.use(protect);

// Create a note
router.post("/", createNote);

// Get all notes
router.get("/", getNotes);

// Update a note
router.put("/:id", updateNote);

// Delete a note
router.delete("/:id", deleteNote);

module.exports = router;
