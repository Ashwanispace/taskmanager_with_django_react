// src/components/Login.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await login(form.username, form.password);
        if (success) {
            navigate('/tasks');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={form.username} 
                    onChange={handleChange} 
                    required 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={handleChange} 
                    required 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
