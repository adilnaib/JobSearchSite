import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Employer.css";

const AddDetails = () => {
    const [empName, setEmpName] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [empContact, setEmpContact] = useState("");
    const [empOrg, setEmpOrg] = useState("");
    const [empAddress, setEmpAddress] = useState("");
    const [username, setUsername] = useState(""); // To store username from localStorage
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Retrieve the username from localStorage
        const storedUsername = localStorage.getItem("username");
        setUsername(storedUsername);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const employerData = {
                empName,
                empEmail,
                empContact,
                empOrg,
                empAddress,
                username, // Adding username to the request body
            };

            // Send request to register employer details
            const response = await axios.post(
                "http://localhost:9090/employer/register", // Ensure this is the correct endpoint
                employerData
            );
            setIsLoading(false);
            navigate("/employer/dashboard"); // Navigate to the employer dashboard
        } catch (error) {
            setIsLoading(false);
            setError("An error occurred while saving the details.");
        }
    };


    return (
        <div className="add-details-container">
            <h1>Hello, {username}!</h1>
            <h2>Employer Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Full Name</label>
                    <input
                        type="text"
                        value={empName}
                        onChange={(e) => setEmpName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={empEmail}
                        onChange={(e) => setEmpEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Contact</label>
                    <input
                        type="text"
                        value={empContact}
                        onChange={(e) => setEmpContact(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Organization</label>
                    <input
                        type="text"
                        value={empOrg}
                        onChange={(e) => setEmpOrg(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <textarea
                        value={empAddress}
                        onChange={(e) => setEmpAddress(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-button">Save Details</button>
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

export default AddDetails;
