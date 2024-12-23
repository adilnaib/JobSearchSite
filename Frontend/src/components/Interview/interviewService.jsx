import axios from "axios";

const BASE_URL = "http://localhost:9090/interview";

const InterviewService = {
  createInterview: async (interviewData, jobApplicationId) => {
    if (!jobApplicationId) {
      throw new Error("Job Application ID is required");
    }

    try {
      // Format the date and time according to backend expectations
      const formattedDate = new Date(interviewData.date).toISOString().split('T')[0];
      const formattedTime = interviewData.time + ":00"; // Add seconds for LocalTime format

      const formattedData = {
        date: formattedDate,
        time: formattedTime,
        location: interviewData.location,
        meetingLink: interviewData.meetingLink || "",
        panelMembers: interviewData.panelMembers,
        interviewMode: interviewData.interviewMode,
        interviewType: interviewData.interviewType,
        instructions: interviewData.instructions,
        status: "SCHEDULED"
      };

      console.log("Sending interview data:", formattedData);

      const response = await axios.post(
        `${BASE_URL}/create/${jobApplicationId}`,
        formattedData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error creating interview:", error.response?.data || error);
      throw error;
    }
  },

  getInterviewsByEmployerId: async (employerId) => {
    try {
      const response = await axios.get(`${BASE_URL}/employer/${employerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employer interviews:", error);
      throw error;
    }
  },

  getInterviewsBySeekerId: async (seekerId) => {
    try {
      const response = await axios.get(`${BASE_URL}/seeker/${seekerId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching seeker interviews:", error);
      throw error;
    }
  },

  getInterviewsByJobApplicationId: async (jobApplicationId) => {
    try {
      const response = await axios.get(`${BASE_URL}/application/${jobApplicationId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching job application interviews:", error);
      throw error;
    }
  },

  cancelInterview: async (interviewId) => {
    try {
      const response = await axios.put(`${BASE_URL}/cancel/${interviewId}`);
      return response.data;
    } catch (error) {
      console.error("Error cancelling interview:", error);
      throw error;
    }
  },

  rescheduleInterview: async (interviewId, newData) => {
    try {
      // Format the date and time for the update
      const formattedData = {
        ...newData,
        date: new Date(newData.date).toISOString().split('T')[0],
        time: newData.time + ":00"
      };

      const response = await axios.put(`${BASE_URL}/update/${interviewId}`, formattedData);
      return response.data;
    } catch (error) {
      console.error("Error rescheduling interview:", error);
      throw error;
    }
  },

  getInterviewDetails: async (interviewId) => {
    try {
      const response = await axios.get(`${BASE_URL}/${interviewId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching interview details:", error);
      throw error;
    }
  }
};

export default InterviewService;
