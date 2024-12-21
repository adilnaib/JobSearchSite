import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import axios from 'axios';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false); // For loading spinner
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Use useNavigate instead of useHistory

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Send the login request to the backend
            const response = await axios.post('http://localhost:9090/auth/login', {
                username,
                password,
            });

            // If the login is successful, store token and role
            const { token, role } = response.data;

            // Store token in localStorage
            localStorage.setItem('token', token);

            // Set a success message or handle redirection
            setMessage(`Logged in as ${role}`); // Use role or username for display, not the whole object

            // Make a call to get the employer details using username
            const employerResponse = await axios.get(`http://localhost:9090/employer/profile/${username}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const employerDetails = employerResponse.data;

            // Check if employer details are filled
            if (employerDetails.empName && employerDetails.empEmail) {
                // If details are filled, redirect to the employer dashboard
                navigate('/employer/dashboard');
            } else {
                // If details are not filled, redirect to the add details page
                navigate('/employer/add-details');
            }

        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                setError('Invalid username or password');
            }
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
