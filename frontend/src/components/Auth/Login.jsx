import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken, isAuthenticated, setUserRole } from '../../utils/auth';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        
        try {
            const response = await axios.post('http://localhost:9090/auth/login', {
                username,
                password,
            });

            const { token, role } = response.data;
            
            console.log('Login response role:', role);
            
            // Use the auth utility to set token
            setAuthToken(token);
            // Store username in localStorage
            localStorage.setItem('username', username);
            // Store user role
            setUserRole(role);
            
            setMessage(`Logged in as ${role}`);

            try {
                const employerResponse = await axios.get(`http://localhost:9090/employer/profile/${username}`);
                const employerDetails = employerResponse.data;

                if (employerDetails.empName && employerDetails.empEmail) {
                    navigate('/employer/dashboard');
                } else {
                    navigate('/employer/add-details');
                }
            } catch (profileError) {
                console.error('Error fetching profile:', profileError);
                navigate('/employer/add-details');
            }

        } catch (error) {
            setAuthToken(null); // Clear any existing token
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Invalid username or password');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="register-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Username:</label>
                    {message && <p className="success-message">{message}</p>} {/* Display success message */}
                    {error && <p className="error-message">{error}</p>} {/* Display error message */}
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="register-button">Login</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default Login;
