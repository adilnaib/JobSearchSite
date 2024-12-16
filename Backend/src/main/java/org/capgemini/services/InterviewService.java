package org.capgemini.services;

import org.capgemini.model.Interview;
import org.capgemini.model.JobApplication;
import org.capgemini.repository.InterviewRepository;
import org.capgemini.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    // Create a new interview with job application
    public Interview createInterviewWithApplication(Long applicationId, Interview interview) {
        JobApplication jobApplication = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Job Application not found"));

        // Link the job application to the interview
        interview.setJobApplication(jobApplication);
        return interviewRepository.save(interview);
    }

    // Get pre-fill data for interview
    public Map<String, String> getInterviewPreFillData(Long applicationId) {
        JobApplication jobApplication = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Job Application not found"));

        // Fetch details from related entities
        Map<String, String> preFillData = new HashMap<>();
        preFillData.put("candidate", jobApplication.getSeeker().getJsName()); // Seeker name
        preFillData.put("position", jobApplication.getJob().getJobTitle()); // Job title
        preFillData.put("employer", jobApplication.getJob().getEmployer().getEmpName()); // Employer name
        return preFillData;
    }

    // Create a new interview
    public Interview createInterview(Interview interview) {
        return interviewRepository.save(interview);
    }

    // Get all interviews
    public List<Interview> getAllInterviews() {
        return interviewRepository.findAll();
    }

    // Get interview by ID
    public Optional<Interview> getInterviewById(Long id) {
        return interviewRepository.findById(id);
    }

    // Update an existing interview
    public Interview updateInterview(Long id, Interview interviewDetails) {
        Optional<Interview> interview = interviewRepository.findById(id);

        if (interview.isPresent()) {
            Interview existingInterview = interview.get();

            // Update fields
            existingInterview.setDate(interviewDetails.getDate());
            existingInterview.setTime(interviewDetails.getTime());
            existingInterview.setInterviewMode(interviewDetails.getInterviewMode());
            existingInterview.setLocation(interviewDetails.getLocation());
            existingInterview.setInterviewType(interviewDetails.getInterviewType());
            existingInterview.setPanelMembers(interviewDetails.getPanelMembers());
            existingInterview.setMeetingLink(interviewDetails.getMeetingLink());
            existingInterview.setInstructions(interviewDetails.getInstructions());
            existingInterview.setStatus(interviewDetails.getStatus());

            return interviewRepository.save(existingInterview);
        }

        return null; // Return null if no interview is found
    }

    // Delete an interview by ID
    public void deleteInterview(Long id) {
        interviewRepository.deleteById(id);
    }
}
