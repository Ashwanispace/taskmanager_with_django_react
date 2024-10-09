// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthProvider, { AuthContext } from './contexts/AuthContext';
import TaskProvider from './contexts/TaskContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import TaskForm from './components/TaskForm';

const App = () => {
    return (
        <AuthProvider>
            <TaskProvider>
                <Router>
                    <Navbar />
                    <div className="container mx-auto p-4">
                        <Routes>
                            <Route path="/" element={<GuestRoute><Home /></GuestRoute>} />
                            <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
                            <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
                            {/* Protected routes */}
                            <Route path="/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
                            <Route path="/tasks/new" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
                            <Route path="/tasks/:id" element={<PrivateRoute><TaskDetail /></PrivateRoute>} />
                            <Route path="/tasks/:id/edit" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
                            {/* Catch all 404 */}
                            <Route path="*" element={<GuestRoute><NotFound /></GuestRoute>} />
                        </Routes>
                    </div>
                </Router>
            </TaskProvider>
        </AuthProvider>
    );
};

// Home component for non-logged-in users
const Home = () => {
    return (
        <div className="text-center mt-10">
            <h1 className="text-4xl font-bold">Welcome to the Task Management System</h1>
            <p className="mt-4 text-lg">Please login or register to continue.</p>
        </div>
    );
};

// 404 Not Found Component
const NotFound = () => {
    return (
        <div className="text-center mt-10">
            <h2 className="text-3xl font-semibold">404 - Not Found</h2>
            <p className="mt-2 text-lg">The page you are looking for does not exist.</p>
        </div>
    );
};

// PrivateRoute component for logged-in users
const PrivateRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    
    // If the user is not logged in, redirect to the home page
    return user ? children : <Navigate to="/" />;
};

// GuestRoute component for non-logged-in users
const GuestRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    
    // If the user is logged in, redirect to /tasks
    return !user ? children : <Navigate to="/tasks" />;
};

export default App;
