import axios from "axios";

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: "http://localhost:8085/interview",
  headers: {
    "Content-Type": "application/json",
  },
});

const InterviewService = {
  // Create a new interview
  createInterview: async (interviewData, jobApplicationId) => {
    try {
      const response = await apiClient.post(
        `/create/${jobApplicationId}`,
        interviewData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating interview:", error);
      throw error;
    }
  },

  // Update an existing interview
  updateInterview: async (interviewId, updatedData) => {
    try {
      const response = await apiClient.put(
        `/update/${interviewId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating interview:", error);
      throw error;
    }
  },

  // Cancel an interview
  cancelInterview: async (interviewId) => {
    try {
      const response = await apiClient.put(`/cancel/${interviewId}`);
      return response.data;
    } catch (error) {
      console.error("Error cancelling interview:", error);
      throw error;
    }
  },

  // Get all interviews scheduled by an employer
  getInterviewsByEmployerId: async (employerId) => {
    try {
      const response = await apiClient.get(`/employer/${employerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching interviews for employer:", error);
      throw error;
    }
  },

  // Get all interviews scheduled for a specific job seeker
  getInterviewsBySeekerId: async (seekerId) => {
    try {
      const response = await apiClient.get(`/seeker/${seekerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching interviews for job seeker:", error);
      throw error;
    }
  },

  // Get details of a specific interview
  getInterviewDetails: async (interviewId) => {
    try {
      const response = await apiClient.get(`/${interviewId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching interview details:", error);
      throw error;
    }
  },
};

export default InterviewService;
