import axios from "axios";

const BASE_URL = "http://localhost:8085/interview";

const InterviewService = {
  // Create a new interview
  createInterview: (interviewData, jobApplicationId) => {
    return axios.post(`${BASE_URL}/create/${jobApplicationId}`, interviewData);
  },

  // Update an existing interview
  updateInterview: (interviewId, updatedData) => {
    return axios.put(`${BASE_URL}/update/${interviewId}`, updatedData);
  },

  // Cancel an interview
  cancelInterview: (interviewId) => {
    return axios.put(`${BASE_URL}/cancel/${interviewId}`);
  },

  // Get all interviews scheduled by an employer
  getInterviewsByEmployerId: (employerId) => {
    return axios.get(`${BASE_URL}/employer/${employerId}`);
  },

  // Get all interviews scheduled for a specific job seeker
  getInterviewsBySeekerId: (seekerId) => {
    return axios.get(`${BASE_URL}/seeker/${seekerId}`);
  },

  // Get details of a specific interview
  getInterviewDetails: (interviewId) => {
    return axios.get(`${BASE_URL}/${interviewId}`);
  },
};

export default InterviewService;
