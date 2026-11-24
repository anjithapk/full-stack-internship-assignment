
const express = require("express");
const router = express.Router();

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");

// Create a task
router.post("/", createTodo);

// Get all tasks
router.get("/", getTodos);

// Update a task
router.put("/:id", updateTodo);

// Delete a task
router.delete("/:id", deleteTodo);

module.exports = router;