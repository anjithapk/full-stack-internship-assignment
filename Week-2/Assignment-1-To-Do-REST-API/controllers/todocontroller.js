
const Todo = require("../models/Todo");

// Create a new task
const createTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const todo = await Todo.create({
            title,
            description,
            completed,
            user: req.user
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get only the logged-in user's tasks
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update only the logged-in user's task
const updateTodo = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const todo = await Todo.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            { title, description, completed },
            { new: true, runValidators: true }
        );

        if (!todo) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete only the logged-in user's task
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if (!todo) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createTodo,
    getTodos,
    updateTodo,
    deleteTodo
};
