import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployerDashboard = () => {
    const [employer, setEmployer] = useState(null);
    const [error, setError] = useState('');
    const username = localStorage.getItem('username');  // Assuming you stored the username in localStorage after login

    useEffect(() => {
        const fetchEmployerData = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve the token from localStorage
                const response = await axios.get(`http://localhost:9090/employer/profile/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEmployer(response.data);
            } catch (error) {
                setError('Failed to load employer data');
            }
        };

        if (username) {
            fetchEmployerData();
        } else {
            setError('No username found in localStorage');
        }
    }, [username]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Employer Dashboard</h2>
            {employer ? (
                <div>
                    <h3>Hello, {employer.empName}</h3>
                    <p>Email: {employer.empEmail}</p>
                    <p>Contact: {employer.empContact}</p>
                    <p>Address: {employer.empAddress}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default EmployerDashboard;
