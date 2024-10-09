// src/components/Register.jsx

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: '',
        password: '',
        password2: '',
    });

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.password2) {
            alert("Passwords do not match!");
            return;
        }
        const success = await register(form.username, form.password, form.password2);
        if (success) {
            navigate('/tasks');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col">
                <input 
                    type="text" 
                    name="username" 
                    placeholder="Username" 
                    value={form.username} 
                    onChange={handleChange} 
                    required 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input 
                    type="password" 
                    name="password" 
                    placeholder="Password" 
                    value={form.password} 
                    onChange={handleChange} 
                    required 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input 
                    type="password" 
                    name="password2" 
                    placeholder="Confirm Password" 
                    value={form.password2} 
                    onChange={handleChange} 
                    required 
                    className="mb-4 p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
