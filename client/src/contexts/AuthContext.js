import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Check for token in localStorage on mount
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // Optionally, verify token with backend
            setUser({ token });
        }
    }, []);

    const login = async (email, password) => {
        try {
            const res = await axios.post('http://localhost:8080/user/login', { email, password });

            localStorage.setItem('token', res.data.result.token);
            setUser({ token: res.data.result.token });
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const signup = async (data) => {
        try {
            await axios.post('http://localhost:8080/user/signup', data);
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        login,
        signup,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
