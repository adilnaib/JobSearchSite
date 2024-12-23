import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './JobSeeker.css';

const JobSeekerDashboard = () => {
    const [seeker, setSeeker] = useState(null);
    const [favoriteJobs, setFavoriteJobs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [interviews, setInterviews] = useState([]); // State to store scheduled interviews
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [interviewError, setInterviewError] = useState(null);
    const [searchText, setSearchText] = useState('');
    const [searchType, setSearchType] = useState('byTitle');
    const [selectedJob, setSelectedJob] = useState(null);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    useEffect(() => {
        if (!token || !username) {
            navigate('/login');
        } else {
            fetchSeekerData();
        }
        fetchInterviews(); // Fetch interviews when the component mounts
    }, []);

    useEffect(() => {
        if (seeker?.jsId) {
            fetchJobs();
            fetchFavoriteJobs(); // Fetch favorite jobs only after seeker is loaded
            fetchInterviews(); // Refetch interviews after seeker is loaded
        }
    }, [seeker]);

    // Fetch the job seeker's profile
    const fetchSeekerData = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/jobseeker/profile/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setSeeker(response.data);
        } catch (err) {
            console.error('Error fetching seeker data:', err);
            setError('Error fetching seeker data.');
        }
    };

    // Fetch all available jobs
    const fetchJobs = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:9090/jobseeker/viewAllJobs');
            setJobs(response.data);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError('Error fetching jobs.');
        } finally {
            setLoading(false);
        }
    };

    // Fetch favorite jobs
    const fetchFavoriteJobs = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/jobseeker/viewFavouriteJobs/${seeker.jsId}`);
            const favoriteJobIds = response.data.map((job) => job.jobId); // Extract favorite job IDs
            setFavoriteJobs(favoriteJobIds);

            // Save to localStorage for persistence
            localStorage.setItem('favoriteJobs', JSON.stringify(favoriteJobIds));
        } catch (err) {
            console.error('Error fetching favorite jobs:', err);
            // Fallback to localStorage if server fetching fails
            const savedFavorites = localStorage.getItem('favoriteJobs');
            if (savedFavorites) {
                setFavoriteJobs(JSON.parse(savedFavorites));
            }
        }
    };

    // Fetch scheduled interviews
    const fetchInterviews = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/interview/seeker/${seeker?.jsId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const interviewData = response.data ?? [];
            setInterviews(interviewData);
            if (interviewData.length === 0) {
                setInterviewError('No interviews scheduled at the moment.');
            } else {
                setInterviewError(null); // Clear previous errors
            }
        } catch (err) {
            console.error('Error fetching interviews:', err);
            const fallbackInterviews = interviews ?? []; // Retain existing data if available
            if (fallbackInterviews.length === 0) {
                setInterviewError('Error fetching interviews.');
            }
        }
    };

    // Add job to favorites
    const addFavoriteJob = async (jobId) => {
        try {
            await axios.post(`http://localhost:9090/jobseeker/addFavouriteJob/${jobId}/${seeker.jsId}`);
            setFavoriteJobs((prev) => {
                const updatedFavorites = [...prev, jobId];
                localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites)); // Update localStorage
                return updatedFavorites;
            });
        } catch (err) {
            console.error('Error adding job to favorites:', err);
        }
    };

    // Remove job from favorites
    const removeFavoriteJob = async (jobId) => {
        try {
            // Attempt to remove from the backend
            const response = await axios.delete(`http://localhost:9090/jobseeker/removeFavouriteJob/${jobId}/${seeker.jsId}`);

            if (response.status === 200) {
                setFavoriteJobs((prev) => {
                    const updatedFavorites = prev.filter((id) => id !== jobId);
                    localStorage.setItem('favoriteJobs', JSON.stringify(updatedFavorites)); // Update localStorage
                    return updatedFavorites;
                });
            } else {
                console.error('Failed to remove favorite job:', response.data);
            }
        } catch (err) {
            console.error('Error removing job from favorites:', err);
            alert('Failed to remove job from favorites. Please try again.');
        }
    };

    // Handle favorite toggle
    const toggleFavorite = (jobId) => {
        if (favoriteJobs.includes(jobId)) {
            removeFavoriteJob(jobId); // If job is already favorited, remove it
        } else {
            addFavoriteJob(jobId); // Otherwise, add it
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        let endpoint;

        switch (searchType) {
            case 'byTitle':
                endpoint = `http://localhost:9090/jobseeker/searchJobsByTitle/${searchText}`;
                break;
            case 'byLocation':
                endpoint = `http://localhost:9090/jobseeker/searchJobsByLocation/${searchText}`;
                break;
            case 'byExperience':
                endpoint = `http://localhost:9090/jobseeker/searchJobsByExperienceInYears/${parseInt(searchText, 10)}`;
                break;
            case 'byCompany':
                endpoint = `http://localhost:9090/jobseeker/searchJobsByCompanyName/${searchText}`;
                break;
            default:
                endpoint = `http://localhost:9090/jobseeker/searchJobsByTitle/${searchText}`;
        }

        try {
            const response = await axios.get(endpoint);
            setJobs(response.data);
        } catch (err) {
            console.error('Error fetching filtered jobs:', err);
            setError('Failed to fetch filtered jobs.');
        } finally {
            setLoading(false);
        }
    };

    // Handle the Apply for job
    const handleApply = async (jobId) => {
        if (!seeker || !seeker.jsId) {
            alert('Invalid seeker profile. Please log in again.');
            return;
        }

        const confirmApply = window.confirm('Are you sure you want to apply for this job?');
        if (!confirmApply) return;

        try {
            await axios.post(`http://localhost:9090/jobseeker/applyForJob/${jobId}/${seeker.jsId}`);
            alert('Successfully applied for the job!');
        } catch (err) {
            console.error('Error applying for job:', err);
            alert('Failed to apply for the job. Please try again.');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="dashboard-container">
            {/* Profile Section */}
            <div className="profile-section">
                <div className="logo-container" style={{ flex: '1' }}>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="logo"
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer', height: '80px' }}
                    />
                </div>
                <h1 style={{ flex: '2', textAlign: 'center', margin: 0 }}>Welcome, {seeker?.jsName}</h1>
                <div className="actions-container" style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="profile-btn" onClick={() => navigate('/jobseeker/profile')}>Profile</button>
                    <button
                        className="logout-btn"
                        onClick={() => {
                            localStorage.clear();
                            navigate('/');
                        }}
                    >
                        Logout
                    </button>
                </div>
            </div>

            {/* Jobs Section */}
            <div className="jobs-section">
                <div className="jobs-header">
                    <h2>Explore Jobs</h2>
                </div>

                {/* Search Bar */}
                <div className="search-container">
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <select
                        className="search-dropdown"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="byTitle">By Job Title</option>
                        <option value="byLocation">By Location</option>
                        <option value="byExperience">By Experience</option>
                        <option value="byCompany">By Company Name</option>
                    </select>
                    <button className="search-btn" onClick={handleSearch}>Search</button>
                    <button className="reset-btn" onClick={() => window.location.reload()}>Reset</button>
                    <button
                        className="viewFav-btn"
                        onClick={() => {
                            const favoriteJobsList = jobs.filter((job) => favoriteJobs.includes(job.jobId));
                            setJobs(favoriteJobsList);
                        }}
                    >
                        View Favourites
                    </button>
                </div>

                {jobs.length === 0 ? (
                    <div className="no-jobs"><p>No jobs available at the moment.</p></div>
                ) : (
                    <div className="jobs-list">
                        {jobs.map((job) => (
                            <div key={job.jobId} className="job-card">
                                <button
                                    className="btn favorite-btn p-0"
                                    onClick={() => toggleFavorite(job.jobId)}
                                >
                                    <i className={`bi ${favoriteJobs.includes(job.jobId) ? 'bi-heart-fill text-danger' : 'bi-heart'}`}></i>
                                </button>
                                <h3>{job.jobTitle}</h3>
                                <p><strong>Location:</strong> {job.jobLocation}</p>
                                <p><strong>Salary:</strong> ${job.jobSalary}</p>
                                <p><strong>Description:</strong> {job.description}</p>
                                {/* Render modal outside jobs list */}
                                {selectedJob && (
                                    <div className="modal">
                                        <div className="modal-content">
                                            <h2>{selectedJob.jobTitle}</h2>
                                            <p><strong>Location:</strong> {selectedJob.jobLocation}</p>
                                            <p><strong>Salary:</strong> ${selectedJob.jobSalary}</p>
                                            <p><strong>Description:</strong> {selectedJob.description}</p>
                                            <p><strong>Company:</strong> {selectedJob.companyName}</p>
                                            <p><strong>Experience Required:</strong> {selectedJob.experienceRequired} years</p>
                                            <button onClick={() => setSelectedJob(null)}>Close</button>
                                        </div>
                                    </div>
                                )}

                                {/* Inside job card */}
                                <div className="job-actions">
                                    <button
                                        onClick={() => setSelectedJob(job)}
                                        className="view-details-btn"
                                    >
                                        View Details
                                    </button>
                                    {job.jobStatus=="OPEN" ? (
                                        <span className="applied-text">Applied</span>
                                    ) : (
                                        <button
                                            onClick={() => handleApply(job.jobId)}
                                            className="approve-btn"
                                        >
                                            Apply
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Interviews Section */}
            <div className="interviews-section">
                <h2>Scheduled Interviews</h2>
                {interviewError ? (
                    <div className="error">{interviewError}</div>
                ) : interviews.length === 0 ? (
                    <div className="no-interviews">
                        <p>No interviews scheduled at the moment.</p>
                    </div>
                ) : (
                    <div className="interviews-list">
                        {interviews.map((interview) => (
                            <div key={interview.interviewId} className="job-card">
                                <h3>{interview.jobTitle}</h3>
                                <p><strong>Company:</strong> {interview.companyName}</p>
                                <p><strong>Date:</strong> {new Date(interview.date).toLocaleString()}</p>

                                <p><strong>Location:</strong> {interview.location || 'Online'}</p>
                                <p><strong>Panel Members:</strong> {interview.panelMembers}</p>
                                <p><strong>Interview Mode:</strong> {interview.interviewMode}</p>
                                <p><strong>Interview Type:</strong> {interview.interviewType}</p>
                                <p><strong>Instructions:</strong> {interview.instructions}</p>
                                <p><strong>Status:</strong> {interview.status}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobSeekerDashboard;