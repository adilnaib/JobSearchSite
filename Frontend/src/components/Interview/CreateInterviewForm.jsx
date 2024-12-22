import React, { useState } from "react";
import InterviewService from "../../services/interviewService";
import "./CreateInterviewForm.css";

const CreateInterviewForm = ({ onClose, onInterviewCreated }) => {
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "",
    meetingLink: "",
    panelMembers: "",
    interviewMode: "Online",
    interviewType: "Technical Interview",
    instructions: "",
    status: "Scheduled",
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear error on change
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.time) newErrors.time = "Time is required.";
    if (!formData.location) newErrors.location = "Location is required.";
    if (!formData.meetingLink)
      newErrors.meetingLink = "Meeting link is required.";
    if (!formData.panelMembers)
      newErrors.panelMembers = "Panel members are required.";
    if (!formData.instructions)
      newErrors.instructions = "Instructions are required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await InterviewService.createInterview(formData);
      alert("Interview created successfully!");
      onInterviewCreated(response.data); // Notify parent of the new interview
      onClose(); // Close the form after submission
    } catch (error) {
      console.error("Error creating interview:", error);
      alert("Failed to create interview.");
    }
  };

  // Handle cancel action
  const handleCancel = () => {
    onClose(); // Call the onClose prop to hide the form
  };

  return (
    <div className="create-interview-form-container">
      <form className="create-interview-form" onSubmit={handleSubmit}>
        <h2>Create New Interview</h2>
        {/* Input fields */}
        {[
          { label: "Date", name: "date", type: "date" },
          { label: "Time", name: "time", type: "time" },
          { label: "Location", name: "location", type: "text" },
          { label: "Meeting Link", name: "meetingLink", type: "text" },
          { label: "Panel Members", name: "panelMembers", type: "text" },
        ].map((field) => (
          <div className="form-group" key={field.name}>
            <label>{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name]}
              onChange={handleInputChange}
              required
            />
            {errors[field.name] && (
              <p className="error">{errors[field.name]}</p>
            )}
          </div>
        ))}

        {/* Interview mode */}
        <div className="form-group">
          <label>Interview Mode:</label>
          <select
            name="interviewMode"
            value={formData.interviewMode}
            onChange={handleInputChange}
          >
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>

        {/* Interview type */}
        <div className="form-group">
          <label>Interview Type:</label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleInputChange}
          >
            <option value="Technical Interview">Technical Interview</option>
            <option value="HR Interview">HR Interview</option>
            <option value="Managerial Interview">Managerial Interview</option>
          </select>
        </div>

        {/* Instructions */}
        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
          ></textarea>
          {errors.instructions && (
            <p className="error">{errors.instructions}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create Interview
          </button>
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateInterviewForm;
