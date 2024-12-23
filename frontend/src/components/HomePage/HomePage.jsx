import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { isAuthenticated, logout, getUserRole } from '../../utils/auth';

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        const authStatus = isAuthenticated();
        setIsLoggedIn(authStatus);
        if (authStatus) {
            const role = getUserRole();
            console.log('Current user role:', role);
            setUserRole(role);
        }
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        setUserRole('');
        navigate('/');
    };

    const handleDashboardClick = () => {
        console.log('Dashboard clicked, role:', userRole);
        if (userRole === 'Employer') {
            navigate('/employer/dashboard');
        } else if (userRole === 'JobSeeker') {
            navigate('/jobseeker/dashboard');
        }
    };

    const handleProfileClick = () => {
        console.log('Profile clicked, role:', userRole);
        if (userRole === 'Employer') {
            navigate('/employer/profile');
        } else if (userRole === 'JobSeeker') {
            navigate('/jobseeker/profile');
        }
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <div className="top-bar">
                    <img src="/logo.png" alt="Logo" className="logo"/>
                    <div className="nav-buttons">
                        {isLoggedIn ? (
                            <>
                                <button onClick={handleDashboardClick}>Dashboard</button>
                                <button onClick={handleProfileClick}>Profile</button>
                                <button onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => navigate('/login')}>Login</button>
                                <button onClick={() => navigate('/register')}>Register</button>
                            </>
                        )}
                    </div>
                </div>
                <div className="content">
                    <img src="/pixeltrue-web-development.png" alt="Side Image" className="side-image"/>
                    <div className="text-content">
                        <h1>Welcome to Job Finder</h1>
                        <p style={{ textAlign: 'center' }}>Your one-stop solution for job search and recruitment.</p>
                        <div className="stats">
                            <div className="stat-box">
                                <h2>500+</h2>
                                <p>Companies</p>
                            </div>
                            <div className="stat-box">
                                <h2>10,000+</h2>
                                <p>People Hired</p>
                            </div>
                            <div className="stat-box">
                                <h2>15 LPA</h2>
                                <p>Average Package</p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HomePage;
