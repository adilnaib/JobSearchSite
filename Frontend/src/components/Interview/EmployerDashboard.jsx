import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // To access employer ID passed via state
import InterviewService from "./interviewService"; // Service to handle API calls
import CreateInterviewForm from "./CreateInterviewForm"; // Component for creating interviews
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const [interviews, setInterviews] = useState([]); // State for interviews
  const [isFormVisible, setIsFormVisible] = useState(false); // Toggle for form visibility
  const [selectedInterview, setSelectedInterview] = useState(null); // Interview to be rescheduled
  const location = useLocation(); // To get state passed to this route
  const employerId = location.state?.empId || 1; // Replace with fallback ID if needed

  // Fetch interviews dynamically using employer ID
  const fetchInterviews = async () => {
    try {
      const response = await InterviewService.getInterviewsByEmployerId(
        employerId
      );
      setInterviews(response.data || []); // Ensure fallback to an empty array
    } catch (error) {
      console.error("Error fetching interviews:", error);
      setInterviews([]); // Default to an empty array on error
    }
  };

  useEffect(() => {
    if (employerId) fetchInterviews();
  }, [employerId]);

  // Handle interview creation
  const handleInterviewCreated = (newInterview) => {
    setInterviews((prev) => [...prev, newInterview]);
    setIsFormVisible(false);
  };

  // Handle interview cancellation
  const handleCancelInterview = async (id) => {
    try {
      await InterviewService.cancelInterview(id);
      alert("Interview cancelled successfully!");
      fetchInterviews();
    } catch (error) {
      console.error("Error cancelling interview:", error);
      alert("Failed to cancel the interview.");
    }
  };

  // Handle rescheduling
  const handleReschedule = (interview) => {
    setSelectedInterview(interview);
    setIsFormVisible(true);
  };

  // Handle viewing interview details
  const handleViewDetails = (interview) => {
    alert(JSON.stringify(interview, null, 2)); // Replace with a modal or detailed component if required
  };

  // Get CSS class for status
  const getStatusClass = (status) => {
    switch (status) {
      case "Scheduled":
        return "status-scheduled";
      case "Cancelled":
        return "status-cancelled";
      case "Done":
        return "status-done";
      default:
        return "status-unknown";
    }
  };

  return (
    <div className="employer-dashboard">
      <h1>Employer Dashboard</h1>
      <button
        className="create-btn"
        onClick={() => {
          setIsFormVisible(true);
          setSelectedInterview(null);
        }}
      >
        Create Interview
      </button>

      {isFormVisible && (
        <CreateInterviewForm
          onClose={() => setIsFormVisible(false)}
          onInterviewCreated={handleInterviewCreated}
          selectedInterview={selectedInterview}
        />
      )}

      <div className="interviews-list">
        <h2>Scheduled Interviews</h2>
        {Array.isArray(interviews) && interviews.length > 0 ? (
          interviews.map((interview) => (
            <div className="interview-card" key={interview.id}>
              <p>
                <strong>Date:</strong> {interview.date}
              </p>
              <p>
                <strong>Time:</strong> {interview.time}
              </p>
              <p>
                <strong>Location:</strong> {interview.location}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className={`status ${getStatusClass(interview.status)}`}>
                  {interview.status}
                </span>
              </p>
              <div className="actions">
                <button
                  className="view-btn"
                  onClick={() => handleViewDetails(interview)}
                >
                  View
                </button>
                <button
                  className="reschedule-btn"
                  onClick={() => handleReschedule(interview)}
                >
                  Reschedule
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => handleCancelInterview(interview.id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-interviews">No interviews scheduled.</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
