// src/components/TaskDetail.jsx

import React, { useContext } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { useParams, Link } from 'react-router-dom';

const TaskDetail = () => {
    const { tasks } = useContext(TaskContext);
    const { id } = useParams();
    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) return <p className="text-center mt-10">Task not found.</p>;

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 border border-gray-300 rounded shadow-md">
            <h2 className="text-3xl font-bold mb-4">{task.title}</h2>
            <p className="mb-2"><strong>Description:</strong> {task.description || 'No description provided.'}</p>
            <p className="mb-2"><strong>Priority:</strong> {task.priority}</p>
            <p className="mb-2"><strong>Status:</strong> {task.status}</p>
            <p className="mb-4"><strong>Due Date:</strong> {task.due_date}</p>
            <div className="flex space-x-4">
                <Link to={`/tasks/${task.id}/edit`} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                </Link>
                <Link to="/tasks" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Back to Tasks
                </Link>
            </div>
        </div>
    );
};

export default TaskDetail;
