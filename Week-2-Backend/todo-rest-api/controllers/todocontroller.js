
const Todo = require("../models/Todo");

// Create a new task
const createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a task
const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
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

// Delete a task
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

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