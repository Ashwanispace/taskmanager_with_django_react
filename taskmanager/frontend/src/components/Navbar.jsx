// src/components/Navbar.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
            <h2 className="text-xl font-bold">Task Manager</h2>
            <div>
                {user ? (
                    <>
                        <span className="mr-4">Hello, {user}</span>
                        <Link to="/tasks" className="mr-4 hover:underline">Tasks</Link>
                        <button onClick={logout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="mr-4 hover:underline">Login</Link>
                        <Link to="/register" className="hover:underline">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
