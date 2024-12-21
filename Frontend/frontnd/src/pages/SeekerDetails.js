import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Details.css';

const SeekerDetails = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
    resume: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Replace with actual API call
      await mockSubmitAPI(formData);
      navigate('/seeker-dashboard');
    } catch (error) {
      alert(error.message);
    }
  };

  // Mock API call - replace with actual API integration
  const mockSubmitAPI = async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000);
    });
  };

  return (
    <div className="details-container">
      <div className="details-card">
        <h2>Complete Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="experience">Years of Experience</label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            >
              <option value="">Select experience</option>
              <option value="0-2">0-2 years</option>
              <option value="2-5">2-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="education">Education</label>
            <textarea
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              placeholder="Enter your educational background"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="skills">Skills</label>
            <textarea
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter your skills (comma separated)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="resume">Upload Resume</label>
            <input
              type="file"
              id="resume"
              name="resume"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <button type="submit" className="submit-button">
            Complete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeekerDetails;
