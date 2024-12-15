import React from 'react';
import { PencilIcon, TrashIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';



const TaskList = ({ tasks = [], onEdit = () => console.warn('onEdit is not defined'), onDelete = () => console.warn('onDelete is not defined'), onToggleComplete = () => console.warn('onToggleComplete is not defined') }) => {
  console.log('Props:', { tasks, onEdit, onDelete, onToggleComplete }); // Debug props

  if (tasks.length === 0) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">No tasks found. Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center flex-1 min-w-0">
                <div className="flex items-center">
                  <button
                    onClick={() => onToggleComplete(task._id, !task.completed)}
                    className="focus:outline-none"
                  >
                    {task.completed ? (
                      <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircleIcon className="h-6 w-6 text-gray-300" />
                    )}
                  </button>
                </div>
                
                <div className="ml-4 flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className={`text-sm font-medium text-gray-900 truncate ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}>
                      {task.title}
                    </p>
                    <span className={`ml-3 px-2 py-1 text-xs rounded-full ${
                      task.category === 'Urgent' 
                        ? 'bg-red-100 text-red-800' 
                        : task.category === 'Work' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {task.category}
                    </span>
                  </div>
                  {task.description && (
                    <p className="mt-1 text-sm text-gray-500 truncate">
                      {task.description}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-400">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="ml-4 flex items-center space-x-4">
                <button
                  onClick={() => onEdit(task)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title="Edit task"
                >
                  <PencilIcon className="h-5 w-5 text-gray-500" />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                  title="Delete task"
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
