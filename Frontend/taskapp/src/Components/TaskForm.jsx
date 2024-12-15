import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSubmit, task }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');  // Add category state

  // Effect to populate fields when editing an existing task
  useEffect(() => {
    if (task) {
      setTitle(task.title);  // Fill the title field with task's title
      setDescription(task.description);  // Fill the description field with task's description
      setCategory(task.category);  // Fill the category field with task's category
    }
  }, [task]);  // Re-run the effect whenever the task changes

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, category });  // Submit the updated task data, including category
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}  // Handle title input
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}  // Handle description input
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}  // Handle category selection
          className="w-full p-3 border border-gray-300 rounded-md"
          required
        >
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>
      <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
        {task ? 'Update Task' : 'Add Task'} {/* Button text changes based on whether it's editing or adding */}
      </button>
    </form>
  );
};

export default TaskForm;
