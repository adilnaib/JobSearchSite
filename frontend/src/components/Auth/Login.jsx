import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setMessage('');

        try {
            const response = await axios.post('http://localhost:9090/auth/login', {
                username,
                password,
            });

            const { token, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            localStorage.setItem('role', role);

            setMessage(`Login successful!`);

            try {
                const employerResponse = await axios.get(`http://localhost:9090/employer/profile/${username}`, {
                    headers: { 
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (employerResponse.data && employerResponse.data.empId) {
                    localStorage.setItem('empId', employerResponse.data.empId);
                    navigate('/employer/dashboard');
                } else {
                    navigate('/employer/add-details');
                }
            } catch (profileError) {
                if (profileError.response && profileError.response.status === 404) {
                    navigate('/employer/add-details');
                } else {
                    throw profileError;
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                // Handle different error status codes
                switch (error.response.status) {
                    case 401:
                        setError('Invalid username or password');
                        break;
                    case 404:
                        setError('User not found');
                        break;
                    case 500:
                        setError('Server error. Please try again later.');
                        break;
                    default:
                        setError(error.response.data.message || 'An error occurred during login');
                }
            } else if (error.request) {
                setError('Network error. Please check your connection.');
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <h2>Login</h2>
                
                {error && <div className="error-message">{error}</div>}
                {message && <div className="success-message">{message}</div>}
                
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter your username"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Enter your password"
                    />
                </div>

                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
};

export default Login;
