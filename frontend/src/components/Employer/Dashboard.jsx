import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Employer.css';

const EmployerDashboard = () => {
    const [employer, setEmployer] = useState(null);
    const [applications, setApplications] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editingJob, setEditingJob] = useState(null);
    const [editedJob, setEditedJob] = useState({});
    const [selectedJob, setSelectedJob] = useState(null);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const navigate = useNavigate();

    const fetchEmployerData = async () => {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (!token || !username) {
            navigate('/login');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:9090/employer/profile/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setEmployer(response.data);
            setError(null);

            // Fetch employer's jobs
            if (response.data.empId) {
                try {
                    const jobsResponse = await axios.get(`http://localhost:9090/employer/getJob/${response.data.empId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setJobs(jobsResponse.data || []);
                } catch (jobError) {
                    console.error('Error fetching jobs:', jobError);
                    setJobs([]);
                }

                // Fetch applications
                try {
                    const appResponse = await axios.get(`http://localhost:9090/employer/applications/${response.data.empId}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setApplications(appResponse.data || []);
                } catch (appError) {
                    console.error('Error fetching applications:', appError);
                    setApplications([]);
                }
            }
        } catch (error) {
            setError('Error fetching employer data');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployerData();
    }, []);

    const handleViewDetails = (job) => {
        setSelectedJob(job);
    };

    const handleCloseDetails = () => {
        setSelectedJob(null);
    };

    const handleViewApplicationDetails = (application) => {
        setSelectedApplication(application);
    };

    const handleCloseApplicationDetails = () => {
        setSelectedApplication(null);
    };

    const handleEditJob = (job) => {
        setEditingJob(job);
        setEditedJob({
            jobTitle: job.jobTitle || '',
            jobLocation: job.jobLocation || '',
            description: job.description || '',
            experienceInYears: job.experienceInYears || '',
            jobSalary: job.jobSalary || '',
            noticePeriodInDays: job.noticePeriodInDays || '',
            companyName: job.companyName || '',
            jobCompanyEmail: job.jobCompanyEmail || '',
            requiredSkills: job.requiredSkills || [],
            jobStatus: job.jobStatus || 'OPEN'
        });
    };

    const handleSaveJob = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication token not found. Please login again.');
                return;
            }

            // Convert numeric fields to numbers
            const jobData = {
                ...editedJob,
                experienceInYears: Number(editedJob.experienceInYears) || 0,
                jobSalary: Number(editedJob.jobSalary) || 0,
                noticePeriodInDays: Number(editedJob.noticePeriodInDays) || 0
            };

            const response = await axios({
                method: 'PUT',
                url: `http://localhost:9090/employer/editJob/${editingJob.jobId}`,
                data: jobData,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.data) {
                setJobs(jobs.map(job =>
                    job.jobId === editingJob.jobId ? response.data : job
                ));
                setEditingJob(null);
                setError(null);
                alert('Job updated successfully!');
            }
        } catch (error) {
            console.error('Error updating job:', error);
            let errorMessage = 'Failed to update job. Please try again.';

            if (error.response) {
                errorMessage = error.response.data.message || 'Server error occurred.';
            } else if (error.request) {
                errorMessage = 'Network error. Please check your connection.';
            }

            setError(errorMessage);
            alert(errorMessage);
        }
    };

    const handleDeleteJob = async (jobId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this job?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication required');
                return;
            }

            await axios.delete(`http://localhost:9090/employer/deleteJob/${jobId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Update the state to remove the deleted job
            setJobs(jobs.filter(job => job.jobId !== jobId));
            alert("Job deleted successfully!");
        } catch (error) {
            console.error('Error deleting job:', error);
            alert('Failed to delete the job. Please try again.');
        }
    };

    const handleUpdateApplication = async (applicationId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setError('Authentication required');
                return;
            }

            const response = await axios.put(`http://localhost:9090/employer/updateApplication/${applicationId}`,
                { status: newStatus },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data) {
                // Update applications list
                setApplications(applications.map(app =>
                    app.applicationId === applicationId ? { ...app, status: newStatus } : app
                ));
                // Close modal if open
                setSelectedApplication(null);
                alert(`Application ${newStatus.toLowerCase()} successfully!`);
            }
        } catch (error) {
            console.error('Error updating application:', error);
            alert('Failed to update application status');
        }
    };

    const handlePostJob = () => {
        navigate('/employer/post-job');
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!employer) return <div className="error">No employer data found</div>;

    return (
        <div className="dashboard-container">
            {/* Profile Section */}
            <div className="profile-section">
                {/* Logo Section */}
                <div className="logo-container" style={{flex: "1"}}>
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="logo"
                        onClick={() => navigate('/')}
                        style={{
                            cursor: 'pointer',
                            height: '80px', // Adjust logo size
                            width: 'auto'
                        }}
                    />
                </div>

                {/* Center Text Section */}
                <h1 style={{flex: "2", textAlign: "center", margin: 0}}>Welcome, {employer.empName}</h1>

                {/* Profile & Logout Section */}
                <div className="actions-container" style={{flex: "1", display: "flex", justifyContent: "flex-end"}}>
                    <button
                        className="profile-btn"
                        onClick={() => {
                            navigate('/employer/profile');
                        }}
                        style={{
                            marginRight: '10px'
                        }}
                    >
                        Profile
                    </button>
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
                    <h2>Your Jobs</h2>
                    <button
                        onClick={() => navigate('/employer/post-job')}
                        className="post-job-btn"
                    >
                        Post New Job
                    </button>
                </div>
                {jobs.length === 0 ? (
                    <div className="no-jobs">
                        <p>You haven't posted any jobs yet.</p>
                    </div>
                ) : (
                    <div className="jobs-list">
                        {jobs.map(job => (
                            <div key={job.jobId} className="job-card">
                                {editingJob?.jobId === job.jobId ? (
                                    <div className="edit-job-form">
                                        <input
                                            type="text"
                                            value={editedJob.jobTitle}
                                            onChange={e => setEditedJob({...editedJob, jobTitle: e.target.value})}
                                            placeholder="Job Title"
                                        />
                                        <input
                                            type="text"
                                            value={editedJob.jobLocation}
                                            onChange={e => setEditedJob({...editedJob, jobLocation: e.target.value})}
                                            placeholder="Location"
                                        />
                                        <textarea
                                            value={editedJob.description}
                                            onChange={e => setEditedJob({...editedJob, description: e.target.value})}
                                            placeholder="Description"
                                        />
                                        <input
                                            type="number"
                                            value={editedJob.experienceInYears}
                                            onChange={e => setEditedJob({...editedJob, experienceInYears: e.target.value})}
                                            placeholder="Experience Required (years)"
                                        />
                                        <input
                                            type="number"
                                            value={editedJob.jobSalary}
                                            onChange={e => setEditedJob({...editedJob, jobSalary: e.target.value})}
                                            placeholder="Salary"
                                        />
                                        <input
                                            type="number"
                                            value={editedJob.noticePeriodInDays}
                                            onChange={e => setEditedJob({...editedJob, noticePeriodInDays: e.target.value})}
                                            placeholder="Notice Period (days)"
                                        />
                                        <input
                                            type="text"
                                            value={editedJob.requiredSkills ? editedJob.requiredSkills.join(', ') : ''}
                                            onChange={e => setEditedJob({...editedJob, requiredSkills: e.target.value.split(',').map(s => s.trim())})}
                                            placeholder="Required Skills (comma-separated)"
                                        />
                                        <div className="edit-actions">
                                            <button onClick={handleSaveJob} className="save-btn">Save</button>
                                            <button onClick={() => setEditingJob(null)} className="cancel-btn">Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <h3>{job.jobTitle}</h3>
                                        <p><strong>Location:</strong> {job.jobLocation}</p>
                                        <p><strong>Description:</strong> {job.description}</p>
                                        <p><strong>Experience Required:</strong> {job.experienceInYears} years</p>
                                        <p><strong>Salary:</strong> {job.jobSalary}</p>
                                        <div className="job-actions">
                                            <button onClick={() => handleEditJob(job)} className="edit-btn">Edit Job
                                            </button>
                                            <button onClick={() => handleViewDetails(job)}
                                                    className="view-details-btn">View Details
                                            </button>
                                            <button onClick={() => handleDeleteJob(job.jobId)}
                                                    className="delete-btn">Delete
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Job Details Modal */}
            {selectedJob && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedJob.jobTitle}</h2>
                        <div className="job-details">
                            <p><strong>Location:</strong> {selectedJob.jobLocation}</p>
                            <p><strong>Description:</strong> {selectedJob.description}</p>
                            <p><strong>Experience Required:</strong> {selectedJob.experienceInYears} years</p>
                            <p><strong>Salary:</strong> {selectedJob.jobSalary}</p>
                            <p><strong>Notice Period:</strong> {selectedJob.noticePeriodInDays} days</p>
                            <p><strong>Required Skills:</strong> {selectedJob.requiredSkills?.join(', ')}</p>
                            <p><strong>Company:</strong> {selectedJob.companyName}</p>
                            <p><strong>Company Email:</strong> {selectedJob.jobCompanyEmail}</p>
                            <p><strong>Status:</strong> {selectedJob.jobStatus}</p>
                        </div>
                        <button onClick={handleCloseDetails} className="close-btn">Close</button>
                    </div>
                </div>
            )}

            {/* Applications Section */}
            <div className="applications-section">
                <h2>Job Applications</h2>
                {applications.length === 0 ? (
                    <div className="no-applications">
                        <p>No applications received yet.</p>
                    </div>
                ) : (
                    <div className="applications-list">
                        {applications.map(application => (
                            <div key={application.applicationId} className="application-card">
                                <div className="application-header">
                                    <h3>Application #{application.applicationId}</h3>
                                    <span className={`status ${application.status.toLowerCase()}`}>
                                        {application.status}
                                    </span>
                                </div>
                                <div className="application-details">
                                    <p><strong>Job ID:</strong> {application.jobId}</p>
                                </div>
                                <div className="application-actions">
                                    <button
                                        onClick={() => handleViewApplicationDetails(application)}
                                        className="view-btn"
                                    >
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Application Details Modal */}
            {selectedApplication && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Application Details</h2>
                        <div className="application-details">
                            <div className="section">
                                <h3>Job Details</h3>
                                <p><strong>Job ID:</strong> {selectedApplication.jobId}</p>
                                <p><strong>Job Title:</strong> {selectedApplication.jobTitle}</p>
                                <p><strong>Location:</strong> {selectedApplication.jobLocation}</p>
                                <p><strong>Description:</strong> {selectedApplication.description}</p>
                                <p><strong>Salary:</strong> {selectedApplication.jobSalary}</p>
                                <p><strong>Experience Required:</strong> {selectedApplication.experienceInYears} years</p>
                                <p><strong>Notice Period:</strong> {selectedApplication.noticePeriodInDays} days</p>
                                <p><strong>Required Skills:</strong> {selectedApplication.requiredSkills?.join(', ')}</p>
                                <p><strong>Company:</strong> {selectedApplication.companyName}</p>
                                <p><strong>Company Email:</strong> {selectedApplication.jobCompanyEmail}</p>
                                <p><strong>Job Status:</strong> {selectedApplication.jobStatus}</p>
                            </div>

                            <div className="section">
                                <h3>Applicant Details</h3>
                                <p><strong>Name:</strong> {selectedApplication.seekerName}</p>
                                <p><strong>Email:</strong> {selectedApplication.seekerEmail}</p>
                                <p><strong>Contact:</strong> {selectedApplication.seekerContact}</p>
                                <p><strong>Address:</strong> {selectedApplication.seekerAddress}</p>
                                <p><strong>Skills:</strong> {selectedApplication.seekerSkills?.join(', ')}</p>
                            </div>

                            <div className="section">
                                <h3>Application Status</h3>
                                <p><strong>Current Status:</strong> <span className={`status ${selectedApplication.status.toLowerCase()}`}>{selectedApplication.status}</span></p>
                                <div className="application-actions">
                                    {selectedApplication.status !== 'APPROVED' && (
                                        <button
                                            onClick={() => handleUpdateApplication(selectedApplication.applicationId, 'APPROVED')}
                                            className="approve-btn"
                                        >
                                            Approve Application
                                        </button>
                                    )}
                                    {selectedApplication.status !== 'REJECTED' && (
                                        <button
                                            onClick={() => handleUpdateApplication(selectedApplication.applicationId, 'REJECTED')}
                                            className="reject-btn"
                                        >
                                            Reject Application
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <button onClick={handleCloseApplicationDetails} className="close-btn">Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EmployerDashboard;