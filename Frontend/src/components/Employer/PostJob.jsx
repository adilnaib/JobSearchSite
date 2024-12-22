import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Employer.css';

const PostJob = () => {
    const [employer, setEmployer] = useState(null);
    const [error, setError] = useState(null);
    const [job, setJob] = useState({
        jobTitle: '',
        jobLocation: '',
        description: '',
        experienceInYears: '',
        jobSalary: '',
        noticePeriodInDays: '',
        companyName: '',
        jobCompanyEmail: '',
        requiredSkills: [],
        jobStatus: 'OPEN'
    });

    const username = localStorage.getItem('username');

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'requiredSkills') {
            setJob({...job, [name]: value.split(',').map(skill => skill.trim())});
        } else if (name === 'experienceInYears' || name === 'jobSalary' || name === 'noticePeriodInDays') {
            setJob({...job, [name]: Number(value)});
        } else {
            setJob({...job, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = localStorage.getItem('username');
        const token = localStorage.getItem('token');

        if (!username) {
            alert('Please complete your employer profile first');
            navigate('/employer/add-details');
            return;
        }

        if (!token) {
            alert('Please login first');
            navigate('/login');
            return;
        }

        try {
            // Fetch employer profile
            const response = await axios.get(`http://localhost:9090/employer/profile/${username}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const employerData = response.data;
            setEmployer(employerData);

            // Post the job
            await axios.post(
                `http://localhost:9090/employer/addJob/${employerData.empId}`,
                job,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            alert('Job posted successfully!');
            navigate('/employer/dashboard');
        } catch (error) {
            console.error('Error:', error);
            setError(error);
            if (error.response) {
                alert(error.response.data.message || 'Error posting job. Please try again.');
            } else {
                alert('Error posting job. Please try again.');
            }
        }
    };


    return (
        <div className="post-job-form">
            <h2>Post New Job</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Job Title</label>
                    <input
                        type="text"
                        name="jobTitle"
                        value={job.jobTitle}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Senior Software Engineer"
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="jobLocation"
                        value={job.jobLocation}
                        onChange={handleChange}
                        required
                        placeholder="e.g. New York, NY"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea
                        name="description"
                        value={job.description}
                        onChange={handleChange}
                        required
                        placeholder="Enter detailed job description..."
                    />
                </div>
                <div className="form-group">
                    <label>Experience Required (years)</label>
                    <input
                        type="number"
                        name="experienceInYears"
                        value={job.experienceInYears}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label>Salary</label>
                    <input
                        type="number"
                        name="jobSalary"
                        value={job.jobSalary}
                        onChange={handleChange}
                        required
                        min="0"
                        placeholder="Annual salary in USD"
                    />
                </div>
                <div className="form-group">
                    <label>Notice Period (days)</label>
                    <input
                        type="number"
                        name="noticePeriodInDays"
                        value={job.noticePeriodInDays}
                        onChange={handleChange}
                        required
                        min="0"
                    />
                </div>
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="companyName"
                        value={job.companyName}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Company Email</label>
                    <input
                        type="email"
                        name="jobCompanyEmail"
                        value={job.jobCompanyEmail}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Required Skills (comma-separated)</label>
                    <input
                        type="text"
                        name="requiredSkills"
                        value={job.requiredSkills.join(', ')}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Java, Spring Boot, React"
                    />
                </div>
                <button type="submit">Post Job</button>
            </form>
        </div>
    );
};

export default PostJob;