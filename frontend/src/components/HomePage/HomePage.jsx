import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { isAuthenticated, logout } from '../../utils/auth';

const HomePage = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoggedIn(isAuthenticated());
    }, []);

    const handleLogout = () => {
        logout();
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Welcome to Job Portal</h1>
                <p>Your one-stop solution for job search and recruitment.</p>
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
                <div className="auth-buttons">
                    {isLoggedIn ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <button onClick={() => navigate('/register')}>Register</button>
                            <button onClick={() => navigate('/login')}>Login</button>
                        </>
                    )}
                </div>
            </header>
        </div>
    );
};

export default HomePage;
