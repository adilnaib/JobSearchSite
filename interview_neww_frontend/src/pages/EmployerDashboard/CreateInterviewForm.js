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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

  const handleCancel = () => {
    onClose(); // Call the onClose prop to hide the form
  };

  return (
    <div className="create-interview-form-container">
      <form className="create-interview-form" onSubmit={handleSubmit}>
        <h2>Create New Interview</h2>
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
          </div>
        ))}

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

        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleInputChange}
          ></textarea>
        </div>

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
