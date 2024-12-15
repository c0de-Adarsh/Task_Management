// const express = require('express');
// const Task = require('../Models/Task'); // Mongoose model
// const { jwAuthMiddleware } = require('../jwt'); // Import middleware
// const router = express.Router();

// // Add a New Task




// // Add a New Task
// router.post('/', jwAuthMiddleware, async (req, res) => {
//     const { title, description, category, completed } = req.body;

//     try {
//         const task = new Task({
//             title,
//             description,
//             category,
//             status: 'Pending',  // Default status
//             user: req.userId, // Link task to logged-in user
//         });

//         await task.save();
//         res.status(201).json(task);
//     } catch (err) {
//         console.error('Error creating task:', err.message);
//         res.status(500).json({ message: 'Error creating task' });
//     }
// });

// // Get All Tasks for the Logged-In User
// router.get('/', jwAuthMiddleware, async (req, res) => {
//     try {
//         const tasks = await Task.find({ user: req.userId }); // Find tasks for the user
//         res.status(200).json(tasks);
//     } catch (err) {
//         console.error('Error fetching tasks:', err.message);
//         res.status(500).json({ message: 'Error fetching tasks' });
//     }
// });




// // router.post('/', jwAuthMiddleware, async (req, res) => {
// //     const { title, description, category, completed } = req.body;

// //     try {
// //         const task = new Task({
// //             title,
// //             description,
// //             category,
// //             completed,
// //             user: req.userId, // Link task to logged-in user
// //         });

// //         await task.save();
// //         res.status(201).json(task);
// //     } catch (err) {
// //         console.error('Error creating task:', err.message);
// //         res.status(500).json({ message: 'Error creating task' });
// //     }
// // });

// // // Get All Tasks for the Logged-In User
// // router.get('/', jwAuthMiddleware, async (req, res) => {
// //     try {
// //         const tasks = await Task.find({ user: req.userId }); // Find tasks for the user
// //         res.status(200).json(tasks);
// //     } catch (err) {
// //         console.error('Error fetching tasks:', err.message);
// //         res.status(500).json({ message: 'Error fetching tasks' });
// //     }
// // });

// // Update a Task
// router.put('/:id', jwAuthMiddleware, async (req, res) => {
//     const { title, description, category, completed } = req.body;

//     try {
//         const task = await Task.findOneAndUpdate(
//             { _id: req.params.id, user: req.userId }, // Ensure user owns the task
//             { title, description, category, completed },
//             { new: true }
//         );

//         if (!task) {
//             return res.status(404).json({ message: 'Task not found' });
//         }

//         res.status(200).json(task);
//     } catch (err) {
//         console.error('Error updating task:', err.message);
//         res.status(500).json({ message: 'Error updating task' });
//     }
// });

// // Delete a Task
// router.delete('/:id', jwAuthMiddleware, async (req, res) => {
//     try {
//         const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });

//         if (!task) {
//             return res.status(404).json({ message: 'Task not found' });
//         }

//         res.status(200).json({ message: 'Task deleted successfully' });
//     } catch (err) {
//         console.error('Error deleting task:', err.message);
//         res.status(500).json({ message: 'Error deleting task' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const taskController = require('../Controllers/taskController');
const auth = require('../Middleware/authMiddleware');

router.post('/', auth, taskController.createTask);
router.get('/', auth, taskController.getTasks);
router.patch('/:id', auth, taskController.updateTask);
router.delete('/:id', auth, taskController.deleteTask);

module.exports = router;