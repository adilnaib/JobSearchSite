import axios from 'axios';

// Authentication utility functions

export const setAuthToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
        // Set axios default header if you're using axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('token');
        // Remove axios default header if you're using axios
        delete axios.defaults.headers.common['Authorization'];
    }
};

export const getAuthToken = () => {
    return localStorage.getItem('token');
};

export const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Remove axios default header if you're using axios
    delete axios.defaults.headers.common['Authorization'];
};
