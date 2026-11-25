
const Note = require("../models/Note");

// Create a note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Please provide title and content"
            });
        }

        const note = await Note.create({
            title,
            content,
            user: req.user
        });

        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all notes of logged-in user
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a note
const updateNote = async (req, res) => {
    try {
        const note = await Note.findOneAndUpdate(
            { _id: req.params.id, user: req.user },
            req.body,
            { new: true, runValidators: true }
        );

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json(note);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a note
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findOneAndDelete({
            _id: req.params.id,
            user: req.user
        });

        if (!note) {
            return res.status(404).json({
                message: "Note not found"
            });
        }

        res.status(200).json({
            message: "Note deleted successfully"
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    createNote,
    getNotes,
    updateNote,
    deleteNote
};
