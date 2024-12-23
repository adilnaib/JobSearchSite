import React, { useState, useEffect } from "react";
import InterviewService from "../../services/interviewService";
import CreateInterviewForm from "./CreateInterviewForm";
import axios from "axios";
import "./EmployerDashboard.css";

const EmployerDashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState(null);
  const [jobApplications, setJobApplications] = useState([]);
  const [selectedJobApplicationId, setSelectedJobApplicationId] = useState(null);
  const [showApplicationSelect, setShowApplicationSelect] = useState(false);

  // Fetch interviews for the employer
  const fetchInterviews = async () => {
    try {
      const response = await InterviewService.getInterviewsByEmployerId(1); // Replace with actual employer ID
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  // Fetch job applications
  const fetchJobApplications = async () => {
    try {
      const response = await axios.get("http://localhost:9090/jobapplications/employer/1"); // Replace with actual employer ID
      setJobApplications(response.data);
    } catch (error) {
      console.error("Error fetching job applications:", error);
    }
  };

  useEffect(() => {
    fetchInterviews();
    fetchJobApplications();
  }, []);

  const handleInterviewCreated = (newInterview) => {
    setInterviews((prev) => [...prev, newInterview]);
    setIsFormVisible(false);
    setShowApplicationSelect(false);
    setSelectedJobApplicationId(null);
  };

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

  const handleCreateInterview = () => {
    setShowApplicationSelect(true);
    setSelectedInterview(null);
    setIsFormVisible(false);
  };

  const handleApplicationSelect = (applicationId) => {
    setSelectedJobApplicationId(applicationId);
    setShowApplicationSelect(false);
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
    setSelectedJobApplicationId(null);
    setShowApplicationSelect(false);
  };

  const handleViewDetails = (interview) => {
    alert(JSON.stringify(interview, null, 2));
  };

  const handleReschedule = (interview) => {
    setSelectedInterview(interview);
    setIsFormVisible(true);
  };

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
      <button className="create-btn" onClick={handleCreateInterview}>
        Create Interview
      </button>

      {showApplicationSelect && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Select Job Application</h2>
            <div className="job-applications-list">
              {jobApplications.length > 0 ? (
                jobApplications.map((application) => (
                  <div
                    key={application.applicationId}
                    className="application-item"
                    onClick={() => handleApplicationSelect(application.applicationId)}
                  >
                    <p><strong>Job Title:</strong> {application.job?.jobTitle}</p>
                    <p><strong>Applicant:</strong> {application.seeker?.name}</p>
                    <p><strong>Status:</strong> {application.status}</p>
                  </div>
                ))
              ) : (
                <p>No job applications available</p>
              )}
            </div>
            <button className="cancel-btn" onClick={() => setShowApplicationSelect(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {isFormVisible && selectedJobApplicationId && (
        <div className="modal-overlay">
          <div className="modal-content">
            <CreateInterviewForm
              onClose={handleCloseForm}
              onInterviewCreated={handleInterviewCreated}
              jobApplicationId={selectedJobApplicationId}
            />
          </div>
        </div>
      )}

      <div className="interviews-list">
        <h2>Scheduled Interviews</h2>
        {interviews.length > 0 ? (
          interviews.map((interview) => (
            <div className="interview-card" key={interview.id}>
              <p><strong>Date:</strong> {interview.date}</p>
              <p><strong>Time:</strong> {interview.time}</p>
              <p><strong>Location:</strong> {interview.location}</p>
              <p><strong>Status:</strong> <span className={`status ${getStatusClass(interview.status)}`}>{interview.status}</span></p>
              <div className="interview-actions">
                <button onClick={() => handleViewDetails(interview)}>View Details</button>
                {interview.status === "Scheduled" && (
                  <>
                    <button onClick={() => handleReschedule(interview)}>Reschedule</button>
                    <button onClick={() => handleCancelInterview(interview.id)}>Cancel</button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No interviews scheduled</p>
        )}
      </div>
    </div>
  );
};

export default EmployerDashboard;
