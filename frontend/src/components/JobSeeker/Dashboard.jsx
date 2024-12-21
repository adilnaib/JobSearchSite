import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobSeekerDashboard = () => {
    const [jobSeeker, setJobSeeker] = useState(null);
    const [error, setError] = useState('');
    const username = localStorage.getItem('username');

    useEffect(() => {
        const fetchJobSeekerData = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:9090/jobseeker/profile/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setJobSeeker(response.data);
            } catch (error) {
                setError('Failed to load job seeker data');
            }
        };

        if (username) {
            fetchJobSeekerData();
        } else {
            setError('No username found in localStorage');
        }
    }, [username]);

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="dashboard-container">
            <h2>Job Seeker Dashboard</h2>
            {jobSeeker ? (
                <div>
                    <h3>Hello, {jobSeeker.name}</h3>
                    <p>Email: {jobSeeker.email}</p>
                    <p>Contact: {jobSeeker.contact}</p>
                    <p>Skills: {jobSeeker.skills}</p>
                    <p>Experience: {jobSeeker.experience} years</p>
                    <p>Education: {jobSeeker.education}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default JobSeekerDashboard;