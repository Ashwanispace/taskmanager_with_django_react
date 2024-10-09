// src/contexts/AuthContext.jsx

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const parseJwt = (token) => {
        try {
            return JSON.parse(atob(token.split('.')[1]));
        } catch (e) {
            return null;
        }
    };

    const [authTokens, setAuthTokens] = useState(() => {
        const tokens = localStorage.getItem('authTokens');
        return tokens ? JSON.parse(tokens) : null;
    });
    const [user, setUser] = useState(() => {
        const tokens = localStorage.getItem('authTokens');
        return tokens ? parseJwt(JSON.parse(tokens).access).username : null;
    });

    const [loading, setLoading] = useState(true);
   
    

    const login = async (username, password) => {
        const response = await fetch('http://localhost:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (response.ok) {
            setAuthTokens(data);
            setUser(parseJwt(data.access).username);
            localStorage.setItem('authTokens', JSON.stringify(data));
            return true;
        } else {
            alert('Login failed: ' + JSON.stringify(data));
            return false;
        }
    };

    const logout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
    };

    const register = async (username, password, password2) => {
        const response = await fetch('http://localhost:8000/api/auth/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, password2 }),
        });
        const data = await response.json();
        if (response.ok) {
            return await login(username, password);
        } else {
            alert('Registration failed: ' + JSON.stringify(data));
            return false;
        }
    };

    const updateToken = async () => {
        if (!authTokens){
            
            setLoading(false);
            return;
        }
        const response = await fetch('http://localhost:8000/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: authTokens?.refresh }),
        });
        const data = await response.json();
        if (response.ok) {
            setAuthTokens(data);
            setUser(parseJwt(data.access).username);
            localStorage.setItem('authTokens', JSON.stringify(data));
        } else {
            
            logout();
        }
     
        if(loading){
            setLoading(false);
        }
        
    };

    useEffect(() => {

        if(loading){
            updateToken(); 
        }

        if(authTokens){
            let interval = setInterval(() => {
                updateToken();
            }, 23*60*60*1000); // Refresh token every 23 hours
            return () => clearInterval(interval);
        }
    }, [authTokens]);

    const contextData = {
        user,
        authTokens,
        login,
        logout,
        register,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null :children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;
