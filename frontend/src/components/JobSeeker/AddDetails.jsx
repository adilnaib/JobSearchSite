import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./JobSeeker.css";

const AddDetailsJobSeeker = () => {
    const [jsName, setJsName] = useState("");
    const [jsEmail, setJsEmail] = useState("");
    const [jsContact, setJsContact] = useState("");
    const [jsAddress, setJsAddress] = useState("");
    const [skills, setSkills] = useState([]); // To store list of skills
    const [newSkill, setNewSkill] = useState(""); // New skill input field
    const [username, setUsername] = useState(""); // Username from localStorage
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
    }, []);

    const handleSkillChange = (e) => {
        setNewSkill(e.target.value); // Update new skill input field
    };

    const addSkill = () => {
        if (newSkill && !skills.includes(newSkill)) {
            setSkills([...skills, newSkill]); // Add skill to the list
            setNewSkill(""); // Clear input field after adding
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const seekerData = {
                jsName,
                jsEmail,
                jsContact,
                jsAddress,
                username,
                jsSkills: skills, // Add the list of skills
            };

            // Send request to register job seeker details
            const response = await axios.post("http://localhost:9090/jobseeker/register", seekerData);
            setIsLoading(false);
            navigate("/jobseeker/dashboard"); // Navigate to jobseeker dashboard
        } catch (error) {
            setIsLoading(false);
            setError("An error occurred while saving the details.");
        }
    };

    return (
        <div className="add-details-container">
            <h1>Hello, {username}!</h1>
            <h2>Job Seeker Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={jsName}
                        onChange={(e) => setJsName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={jsEmail}
                        onChange={(e) => setJsEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contact</label>
                    <input
                        type="text"
                        value={jsContact}
                        onChange={(e) => setJsContact(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        value={jsAddress}
                        onChange={(e) => setJsAddress(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* Skills Section */}
                <div className="form-group">
                    <label>Skills</label>
                    <div className="skills-input">
                        <input
                            type="text"
                            value={newSkill}
                            onChange={handleSkillChange}
                            placeholder="Enter skill"
                        />
                        <button type="button" onClick={addSkill} className="add-skill-button">
                            +
                        </button>
                    </div>
                    <ul className="skills-list">
                        {skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                </div>

                <button type="submit" className="submit-button">
                    Save Details
                </button>
            </form>

            {isLoading && (
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            )}

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default AddDetailsJobSeeker;
