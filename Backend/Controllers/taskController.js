// const Task = require("../Models/Task");

// exports.getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ userId: req.user.id });
//     res.status(200).json(tasks);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.createTask = async (req, res) => {
//   try {
//     const { title, description, category } = req.body;
//     const task = new Task({ title, description, category, userId: req.user.id });
//     await task.save();
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "Task deleted" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


const Task = require('../Models/Task');

// Get all tasks for a user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, category } = req.body;

        // Check if category is provided
        if (!category || !['Work', 'Personal', 'Urgent'].includes(category)) {
            return res.status(400).json({ message: 'Category is required and must be one of Work, Personal, or Urgent' });
        }

        const task = await Task.create({ user: req.user.id, title, description, category });
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing task
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task && task.user.toString() === req.user.id) {
            // Update fields if they are provided
            task.isComplete = req.body.isComplete || task.isComplete;
            task.title = req.body.title || task.title;
            task.description = req.body.description || task.description;
            task.category = req.body.category || task.category;

            // Validate category if it's being updated
            if (task.category && !['Work', 'Personal', 'Urgent'].includes(task.category)) {
                return res.status(400).json({ message: 'Invalid category. Must be one of Work, Personal, or Urgent' });
            }

            const updatedTask = await task.save();
            res.json(updatedTask);
        } else {
            res.status(404).json({ message: 'Task not found or not authorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (task && task.user.toString() === req.user.id) {
            await Task.findByIdAndDelete(req.params.id);
            res.json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ message: 'Task not found or not authorized' });
        }
    } catch (error) {
        console.error('Error in deleteTask:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
