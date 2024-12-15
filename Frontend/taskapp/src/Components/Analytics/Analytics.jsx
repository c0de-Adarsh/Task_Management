import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut, Bar } from 'react-chartjs-2';
import * as api from '../../api/index';

const Analytics = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await api.getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const statusData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [
          tasks.filter((task) => task.completed).length,
          tasks.filter((task) => !task.completed).length,
        ],
        backgroundColor: ['#10B981', '#EF4444'],
      },
    ],
  };

  const categoryData = {
    labels: ['Work', 'Personal', 'Urgent'],
    datasets: [
      {
        label: 'Tasks by Category',
        data: [
          tasks.filter((task) => task.category === 'Work').length,
          tasks.filter((task) => task.category === 'Personal').length,
          tasks.filter((task) => task.category === 'Urgent').length,
        ],
        backgroundColor: ['#3B82F6', '#8B5CF6', '#EF4444'],
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <Link
          to="/dashboard"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Back to Dashboard
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
          <div className="h-64">
            <Doughnut data={statusData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Tasks by Category</h2>
          <div className="h-64">
            <Bar data={categoryData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;