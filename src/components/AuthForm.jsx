import React, { useState } from 'react';
import { signup, login } from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ isLogin = true }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await login(username, password);
            } else {
                await signup(username, password);
            }
            navigate('/'); // Redirect to main page after login/signup
        } catch (error) {
            setMessage('Error: ' + (error.response?.data?.message || 'An error occurred'));
        }
    };

    return (
        <div>
            <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AuthForm;
