import axios from 'axios';

const BASE_URL = 'http://localhost:9090';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error Data:', error.response.data);
      console.error('Error Status:', error.response.status);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', error.message);
    }
    return Promise.reject(error);
  }
);

// Add request interceptor for JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const employerService = {
  // Employer endpoints
  getEmployerById: (empId) => api.get(`/${empId}`),
  registerEmployer: (data) => api.post('/register', data),
  
  // Job endpoints
  getJobs: (empId) => api.get(`/getJob/${empId}`),
  getJobDetails: (empId, jobId) => api.get(`/getjob/${empId}/${jobId}`),
  postJob: (empId, data) => api.post(`/addJob/${empId}`, data),
  editJob: (jobId, data) => api.patch(`/editJob/${jobId}`, data),
  deleteJob: (jobId) => api.delete(`/deleteJob/${jobId}`),
  
  // Application endpoints
  getApplications: (empId) => api.get(`/getApplications/${empId}`),
  updateApplicationStatus: (applicationId, status) => 
    api.patch(`/applications/${applicationId}?status=${status}`),
  
  // Seeker endpoints
  getJobSeekersByJob: (jobId) => api.get(`/jobseekers/${jobId}`),
  searchJobSeekersBySkill: (skillset) => api.get(`/getJobseekers/${skillset}`),
};

// Authenticator endpoints
export const authService = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
};

// JobSeeker endpoints
export const jobSeekerService = {
  getJobSeekerById: (seekerId) => api.get(`/jobseeker/${seekerId}`),
  updateProfile: (seekerId, data) => api.put(`/jobseeker/${seekerId}`, data),
};

// InterviewScheduler endpoints
export const interviewSchedulerService = {
  scheduleInterview: (data) => api.post('/interview/schedule', data),
  getInterviewDetails: (interviewId) => api.get(`/interview/${interviewId}`),
};

export default api;
