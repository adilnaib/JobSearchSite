import React, { useEffect, useState } from "react";
import InterviewService from "../../services/interviewService";
import "./JobSeekerDashboard.css";

const JobSeekerDashboard = () => {
  const [interviews, setInterviews] = useState([]);
  const seekerId = 1; // Replace with actual job seeker ID (e.g., from user authentication context)

  // Fetch interviews scheduled for the job seeker
  const fetchInterviews = async () => {
    try {
      const response = await InterviewService.getInterviewsBySeekerId(seekerId);
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  useEffect(() => {
    fetchInterviews();
  }, []);

  return (
    <div className="job-seeker-dashboard">
      <h1>Job Seeker Dashboard</h1>
      <h2>Scheduled Interviews</h2>
      {interviews.length > 0 ? (
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
      ) : (
        <p>No interviews scheduled yet.</p>
      )}
    </div>
  );
};

export default JobSeekerDashboard;
