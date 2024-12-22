import axios from "axios";

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: "http://localhost:8085/jobApplications",
  headers: {
    "Content-Type": "application/json",
  },
});

const JobApplicationService = {
  // Fetch all job applications by employer ID
  getJobApplicationsByEmployerId: async (employerId) => {
    try {
      const response = await apiClient.get(`/employer/${employerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching job applications for employer:", error);
      throw error;
    }
  },

  // Fetch job application details by application ID
  getJobApplicationDetails: async (applicationId) => {
    try {
      const response = await apiClient.get(`/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching job application details:", error);
      throw error;
    }
  },

  // Create a new job application
  createJobApplication: async (jobApplicationData) => {
    try {
      const response = await apiClient.post(`/create`, jobApplicationData);
      return response.data;
    } catch (error) {
      console.error("Error creating job application:", error);
      throw error;
    }
  },

  // Update an existing job application
  updateJobApplication: async (applicationId, updatedData) => {
    try {
      const response = await apiClient.put(
        `/update/${applicationId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating job application:", error);
      throw error;
    }
  },

  // Delete a job application
  deleteJobApplication: async (applicationId) => {
    try {
      const response = await apiClient.delete(`/delete/${applicationId}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting job application:", error);
      throw error;
    }
  },
};

export default JobApplicationService;
