import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <nav className="welcome-nav">
        <div className="nav-links">
          <Link to="/login">Log In</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
      <div className="welcome-content">
        <h1>Welcome to JobSearch</h1>
        <p>Find your dream job or the perfect candidate</p>
      </div>
    </div>
  );
};

export default Welcome;