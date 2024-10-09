// src/contexts/TaskContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

const TaskProvider = ({ children }) => {
    const { authTokens, logout } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        if (!authTokens) return;
        try {
            const response = await fetch('http://localhost:8000/api/tasks/', {
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.status === 401) {
                logout();
                return;
            }
            const data = await response.json();
            setTasks(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [authTokens]);

    const createTask = async (task) => {
        try {
            const response = await fetch('http://localhost:8000/api/tasks/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify(task),
            });
            if (response.ok) {
                const newTask = await response.json();
                setTasks([...tasks, newTask]);
            } else {
                const errorData = await response.json();
                alert('Failed to create task: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Failed to create task:', error);
        }
    };

    const updateTask = async (id, updatedTask) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authTokens.access}`,
                },
                body: JSON.stringify(updatedTask),
            });
            if (response.ok) {
                const data = await response.json();
                setTasks(tasks.map(task => task.id === id ? data : task));
            } else {
                const errorData = await response.json();
                alert('Failed to update task: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const deleteTask = async (id) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tasks/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${authTokens.access}`,
                },
            });
            if (response.status === 204) {
                setTasks(tasks.filter(task => task.id !== id));
            } else {
                const errorData = await response.json();
                alert('Failed to delete task: ' + JSON.stringify(errorData));
            }
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const contextData = {
        tasks,
        loading,
        fetchTasks,
        createTask,
        updateTask,
        deleteTask,
    };

    return (
        <TaskContext.Provider value={contextData}>
            {children}
        </TaskContext.Provider>
    );
};

export default TaskProvider;
