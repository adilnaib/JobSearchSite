import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import { jobSeekerService } from '../services/api';
import '../styles/Dashboard.css';

const SeekerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('title'); // 'title', 'location', 'skills'
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedExperience, setSelectedExperience] = useState('');
  const user = useSelector(state => state.auth.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const response = await jobSeekerService.viewAllJobs();
      setJobs(response);
      setLoading(false);
    } catch (error) {
      console.error('Error loading jobs:', error);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      loadJobs();
      return;
    }

    try {
      let response;
      switch (filterType) {
        case 'title':
          response = await jobSeekerService.searchJobsByTitle(searchQuery);
          break;
        case 'location':
          response = await jobSeekerService.searchJobsByLocation(searchQuery);
          break;
        case 'skills':
          response = await jobSeekerService.searchJobsBySkills([searchQuery]);
          break;
        default:
          response = await jobSeekerService.viewAllJobs();
      }
      setJobs(response);
    } catch (error) {
      console.error('Error searching jobs:', error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      const response = await jobSeekerService.applyForJob(jobId, user.id);
      alert(response); // Show success message
    } catch (error) {
      alert('Failed to apply for job: ' + error.message);
    }
  };

  const handleSave = async (jobId) => {
    try {
      await jobSeekerService.addFavoriteJob(jobId, user.id);
      alert('Job saved to favorites!');
    } catch (error) {
      alert('Failed to save job: ' + error.message);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <h1>Job Seeker Dashboard</h1>
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
        <div className="search-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">Search</button>
          </div>
          <div className="filters">
            <select 
              className="filter-select"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="title">Search by Title</option>
              <option value="location">Search by Location</option>
              <option value="skills">Search by Skills</option>
            </select>
            <select 
              className="filter-select"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Location</option>
              <option value="remote">Remote</option>
              <option value="bangalore">Bangalore</option>
              <option value="mumbai">Mumbai</option>
              <option value="delhi">Delhi</option>
            </select>
            <select 
              className="filter-select"
              value={selectedExperience}
              onChange={(e) => setSelectedExperience(e.target.value)}
            >
              <option value="">Experience</option>
              <option value="0-2">0-2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5+">5+ years</option>
            </select>
          </div>
        </div>

        <div className="jobs-grid">
          {loading ? (
            <div className="loading">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="no-jobs">No jobs found</div>
          ) : (
            jobs.map((job) => (
              <div key={job.jobId} className="job-card">
                <h3>{job.jobTitle}</h3>
                <h4>{job.companyName}</h4>
                <p>Location: {job.jobLocation}</p>
                <p>Salary: {job.jobSalary} LPA</p>
                <p>Experience Required: {job.experienceInYears} years</p>
                <div className="skills-container">
                  {job.requiredSkills?.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="job-actions">
                  <button 
                    className="apply-btn"
                    onClick={() => handleApply(job.jobId)}
                  >
                    Apply Now
                  </button>
                  <button 
                    className="save-btn"
                    onClick={() => handleSave(job.jobId)}
                  >
                    ♡
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default SeekerDashboard;
