
const express = require("express");
const router = express.Router();

const protect = require("../config/authMiddleware");

const {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
} = require("../controllers/todoController");

// Protect all routes below this line
router.use(protect);

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
