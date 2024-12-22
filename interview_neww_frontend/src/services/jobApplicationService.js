import axios from "axios";

const BASE_URL = "http://localhost:8085/jobApplications";

const JobApplicationService = {
  // Fetch all job applications by employer ID
  getJobApplicationsByEmployerId: (employerId) => {
    return axios.get(`${BASE_URL}/employer/${employerId}`);
  },

  // Fetch job application details by application ID
  getJobApplicationDetails: (applicationId) => {
    return axios.get(`${BASE_URL}/${applicationId}`);
  },

  // Create a new job application
  createJobApplication: (jobApplicationData) => {
    return axios.post(`${BASE_URL}/create`, jobApplicationData);
  },

  // Update an existing job application
  updateJobApplication: (applicationId, updatedData) => {
    return axios.put(`${BASE_URL}/update/${applicationId}`, updatedData);
  },

  // Delete a job application
  deleteJobApplication: (applicationId) => {
    return axios.delete(`${BASE_URL}/delete/${applicationId}`);
  },
};

export default JobApplicationService;
