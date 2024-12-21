import React from 'react';
import './HomePage.css';

const HomePage = () => {
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
                    <button onClick={() => (window.location.href = '/register')}>Register</button>
                    <button onClick={() => (window.location.href = '/login')}>Login</button>
                </div>
            </header>
        </div>
    );
};

export default HomePage;
