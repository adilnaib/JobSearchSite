import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import '../styles/Dashboard.css';

const EmployerDashboard = () => {
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Software Engineer',
      location: 'Remote',
      applications: 12,
    },
    {
      id: 2,
      title: 'Product Manager',
      location: 'Bangalore',
      applications: 8,
    },
  ]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleAddJob = () => {
    // TODO: Implement job creation
    console.log('Add job clicked');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Employer Dashboard</h1>
        <div className="nav-actions">
          <button onClick={() => navigate('/profile')} className="profile-btn">
            Profile
          </button>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      <main className="dashboard-content">
        <div className="content-header">
          <h2>My Job Postings</h2>
          <button onClick={handleAddJob} className="add-btn">
            + Add New Job
          </button>
        </div>

        <div className="jobs-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>Location: {job.location}</p>
              <p>Applications: {job.applications}</p>
              <div className="job-actions">
                <button className="edit-btn">Edit</button>
                <button className="view-btn">View Applications</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EmployerDashboard;
