// src/components/TaskList.jsx

import React, { useContext, useState } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { Link } from 'react-router-dom';

const TaskList = () => {
    const { tasks, loading, deleteTask } = useContext(TaskContext);
    const [sortBy, setSortBy] = useState('');

    const sortedTasks = [...tasks].sort((a, b) => {
        if (sortBy === 'priority') {
            const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if (sortBy === 'due_date') {
            return new Date(a.due_date) - new Date(b.due_date);
        } else {
            return 0;
        }
    });

    if (loading) return <p className="text-center mt-10">Loading tasks...</p>;

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Your Tasks</h2>
                <Link to="/tasks/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create New Task
                </Link>
            </div>
            <div className="mb-4">
                <label className="mr-2 font-semibold">Sort By:</label>
                <select 
                    onChange={(e) => setSortBy(e.target.value)} 
                    value={sortBy} 
                    className="border border-gray-300 rounded p-2"
                >
                    <option value="">--Select--</option>
                    <option value="priority">Priority</option>
                    <option value="due_date">Due Date</option>
                </select>
            </div>
            {sortedTasks.length === 0 ? (
                <p className="text-center">No tasks available.</p>
            ) : (
                <ul>
                    {sortedTasks.map(task => (
                        <li key={task.id} className="border border-gray-300 rounded p-4 mb-4 shadow-md">
                            <div className="flex justify-between items-center">
                                <Link to={`/tasks/${task.id}`} className="text-xl font-semibold text-blue-600 hover:underline">
                                    {task.title}
                                </Link>
                                <div>
                                    <Link to={`/tasks/${task.id}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded mr-2">
                                        Edit
                                    </Link>
                                    <button 
                                        onClick={() => deleteTask(task.id)} 
                                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="mt-2">Priority: <span className="font-semibold">{task.priority}</span></p>
                            <p>Status: <span className="font-semibold">{task.status}</span></p>
                            <p>Due: <span className="font-semibold">{task.due_date}</span></p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
