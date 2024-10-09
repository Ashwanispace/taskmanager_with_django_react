// src/components/TaskForm.jsx

import React, { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../contexts/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';

const TaskForm = () => {
    const { createTask, updateTask, tasks } = useContext(TaskContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);

    const [form, setForm] = useState({
        title: '',
        description: '',
        priority: 'Medium',
        status: 'To Do',
        due_date: '',
    });

    useEffect(() => {
        if (isEdit) {
            const task = tasks.find(t => t.id === parseInt(id));
            if (task) {
                setForm({
                    title: task.title,
                    description: task.description,
                    priority: task.priority,
                    status: task.status,
                    due_date: task.due_date,
                });
            }
        }
    }, [isEdit, id, tasks]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEdit) {
            await updateTask(id, form);
        } else {
            await createTask(form);
        }
        navigate('/tasks');
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">{isEdit ? 'Edit Task' : 'Create New Task'}</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    value={form.title} 
                    onChange={handleChange} 
                    required 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea 
                    name="description" 
                    placeholder="Description" 
                    value={form.description} 
                    onChange={handleChange} 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                ></textarea>
                <select 
                    name="priority" 
                    value={form.priority} 
                    onChange={handleChange} 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select 
                    name="status" 
                    value={form.status} 
                    onChange={handleChange} 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>
                <input 
                    type="date" 
                    name="due_date" 
                    value={form.due_date} 
                    onChange={handleChange} 
                    required 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button type="submit" className={`bg-${isEdit ? 'green' : 'blue'}-500 hover:bg-${isEdit ? 'green' : 'blue'}-700 text-white font-bold py-2 px-4 rounded`}>
                    {isEdit ? 'Update' : 'Create'}
                </button>
            </form>
        </div>
    );
};

export default TaskForm;
