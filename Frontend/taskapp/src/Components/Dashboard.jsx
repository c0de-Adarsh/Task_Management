import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // New state for current task
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.getTasks();
      setTasks(data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleCreateTask = async (taskData) => {
    try {
      const { data } = await api.createTask(taskData);
      setTasks([...tasks, data]);
      setShowForm(false);
      setError('');
    } catch (error) {
      setError('Error creating task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setCurrentTask(task); // Set the current task for editing
    setShowForm(true); // Show the form for editing
  };

  const handleUpdateTask = async (taskData) => {
    try {
      const { data } = await api.updateTask(currentTask._id, taskData);
      setTasks(tasks.map(task => task._id === currentTask._id ? data : task));
      setCurrentTask(null); // Reset current task
      setShowForm(false); // Close the form
    } catch (error) {
      setError('Error updating task. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-purple-600">TaskMaster</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
            {error}
          </div>
        )}

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition duration-150 ease-in-out"
          >
            {showForm ? 'Close Form' : '+ Add New Task'}
          </button>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="mb-6 bg-white rounded-lg shadow-md p-6">
            <TaskForm
              onSubmit={currentTask ? handleUpdateTask : handleCreateTask}
              task={currentTask} // Pass current task to TaskForm
            />
          </div>
        )}

        {/* Task List */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <TaskList
            tasks={tasks}
            onEdit={handleEditTask} // Pass handleEditTask to TaskList
            onDelete={async (id) => {
              await api.deleteTask(id);
              setTasks(tasks.filter(task => task._id !== id));
            }}
            onToggleComplete={async (id, completed) => {
              const { data } = await api.updateTask(id, { completed });
              setTasks(tasks.map(task => task._id === id ? data : task));
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
