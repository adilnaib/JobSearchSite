import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Profile.css';

const JobSeekerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const username = localStorage.getItem('username');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:9090/jobseeker/profile/${username}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data);
                setIsLoading(false);
            } catch (error) {
                setError('Failed to load profile data');
                setIsLoading(false);
            }
        };

        if (username) {
            fetchProfile();
        } else {
            setError('No username found');
            setIsLoading(false);
        }
    }, [username]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="error-message">{error}</div>;
    }

    return (
        <div className="profile-container">
            <h2>Job Seeker Profile</h2>
            {profile && (
                <div className="profile-details">
                    <div className="profile-field">
                        <label>Name:</label>
                        <p>{profile.jsName}</p>
                    </div>
                    <div className="profile-field">
                        <label>Email:</label>
                        <p>{profile.jsEmail}</p>
                    </div>
                    <div className="profile-field">
                        <label>Contact:</label>
                        <p>{profile.jsContact}</p>
                    </div>
                    <div className="profile-field">
                        <label>Skills:</label>

                        <p>{profile.jsSkills.map(skill => skill.charAt(0).toUpperCase() + skill.slice(1)).join(", ")}</p>
                    </div>
                    <button onClick={() => navigate('/jobseeker/dashboard')}>Back to Dashboard</button>
                </div>
            )}
        </div>
    );
};

export default JobSeekerProfile;