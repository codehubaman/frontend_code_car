import axios from 'axios';

const API_URL = 'https://car-management-system-backend.onrender.com';

export const signup = async (username, password) => {
    const response = await axios.post(`${API_URL}/api/users/signup`, { username, password });
    localStorage.setItem('token', response.data.token); // Store JWT token
    return response.data;
};

export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/api/users/login`, { username, password });
    localStorage.setItem('token', response.data.token); // Store JWT token
    return response.data;
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getToken = () => localStorage.getItem('token');
