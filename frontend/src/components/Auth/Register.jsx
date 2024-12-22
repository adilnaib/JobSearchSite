import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./Auth.css";

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        role: "JobSeeker", // Default role
    });

    const [message, setMessage] = useState(""); // For success message
    const [errorMessage, setErrorMessage] = useState(""); // For error message
    const [isLoading, setIsLoading] = useState(false); // For loading spinner
    const navigate = useNavigate(); // Initialize navigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:9090/auth/register", formData);
            setMessage(response.data); // Display success message

            // Save username to localStorage after successful registration
            localStorage.setItem("username", formData.username);

            // After 2 seconds, show loading spinner and redirect
            setTimeout(() => {
                setIsLoading(true); // Show loading spinner
                setTimeout(() => {
                    if (formData.role === "JobSeeker") {
                        navigate("/jobseeker/add-details");
                    } else if (formData.role === "Employer") {
                        navigate("/employer/add-details");
                    }
                }, 2000); // Wait 2 more seconds before redirecting
            }, 2000);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrorMessage(error.response.data);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        }
    };


    return (
        <div className="register-container">
            {isLoading ? ( // Show loading spinner if `isLoading` is true
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                </div>
            ) : (
                <>
                    <h2>Register</h2>
                    {message && <p className="success-message">{message}</p>} {/* Display success message */}
                    {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                placeholder="Enter your username"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select id="role" name="role" value={formData.role} onChange={handleChange}>
                                <option value="JobSeeker">Job Seeker</option>
                                <option value="Employer">Employer</option>
                            </select>
                        </div>
                        <button type="submit" className="register-button">
                            Register
                        </button>
                    </form>
                </>
            )}
        </div>
    );

};

export default Register;
