import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InterviewService from "./interviewService";
import "./JobSeekerDashboard.css";

const InterviewDashboard = () => {
  const [interviews, setInterviews] = useState([]); // Default to an empty array
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const location = useLocation();
  const seekerId = location.state?.seekerId; // Retrieve seekerId from location state

  useEffect(() => {
    if (seekerId) {
      fetchInterviews();
    } else {
      setLoading(false);
      setError("Seeker ID not found. Please log in again.");
    }
  }, [seekerId]);

  const fetchInterviews = async () => {
    setLoading(true);
    try {
      const response = await InterviewService.getInterviewsBySeekerId(seekerId);
      setInterviews(response.data || []); // Ensure the state is always an array
      setError(null);
    } catch (err) {
      console.error("Error fetching interviews:", err);
      setError("Failed to fetch interviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-dashboard">
      <h1>Interview Dashboard</h1>
      {loading ? (
        <p>Loading interviews...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : interviews?.length > 0 ? ( // Safe check for `interviews`
        <>
          <h2>Your Scheduled Interviews</h2>
          <div className="interviews-list">
            {interviews.map((interview) => (
              <div className="interview-card" key={interview.id}>
                <h3>{interview.interviewType}</h3>
                <p>
                  <strong>Date:</strong> {interview.date}
                </p>
                <p>
                  <strong>Time:</strong> {interview.time}
                </p>
                <p>
                  <strong>Mode:</strong> {interview.interviewMode}
                </p>
                <p>
                  <strong>Location:</strong> {interview.location || "N/A"}
                </p>
                <p>
                  <strong>Meeting Link:</strong>{" "}
                  <a
                    href={interview.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {interview.meetingLink || "N/A"}
                  </a>
                </p>
                <p>
                  <strong>Status:</strong> {interview.status}
                </p>
                <p>
                  <strong>Instructions:</strong>{" "}
                  {interview.instructions || "None"}
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No interviews scheduled yet.</p>
      )}
    </div>
  );
};

export default InterviewDashboard;
