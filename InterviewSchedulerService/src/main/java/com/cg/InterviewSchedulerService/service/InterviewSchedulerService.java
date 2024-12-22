package com.cg.InterviewSchedulerService.service;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.repository.InterviewSchedulerRepository;
import com.cg.sharedmodule.model.JobApplication;
import com.cg.sharedmodule.repository.JobApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewSchedulerService {

    @Autowired
    private InterviewSchedulerRepository interviewSchedulerRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    /**
     * Create a new interview and associate it with a job application.
     *
     * @param interviewScheduler the interview details to be created
     * @param jobApplicationId   the ID of the associated job application
     * @return the created InterviewScheduler object
     */
    public InterviewScheduler createInterview(InterviewScheduler interviewScheduler, Long jobApplicationId) {
        JobApplication jobApplication = jobApplicationRepository.findByIdWithDetails(jobApplicationId)
                .orElseThrow(() -> new RuntimeException("Job Application not found!"));

        // Debug: Log the job application details
        System.out.println("Fetched JobApplication: " + jobApplication);

        interviewScheduler.setDetailsFromJobApplication(jobApplication);
        return interviewSchedulerRepository.save(interviewScheduler);
    }


    /**
     * Update an existing interview.
     *
     * @param interviewId      the ID of the interview to update
     * @param updatedInterview the updated interview details
     * @return the updated InterviewScheduler object
     */
    public InterviewScheduler updateInterview(Long interviewId, InterviewScheduler updatedInterview) {
        InterviewScheduler existingInterview = interviewSchedulerRepository.findById(interviewId)
                .orElseThrow(() -> new IllegalArgumentException("Interview not found with ID: " + interviewId));

        // Update relevant fields
        existingInterview.setDate(updatedInterview.getDate());
        existingInterview.setTime(updatedInterview.getTime());
        existingInterview.setLocation(updatedInterview.getLocation());
        existingInterview.setMeetingLink(updatedInterview.getMeetingLink());
        existingInterview.setPanelMembers(updatedInterview.getPanelMembers());
        existingInterview.setInterviewMode(updatedInterview.getInterviewMode());
        existingInterview.setInterviewType(updatedInterview.getInterviewType());
        existingInterview.setInstructions(updatedInterview.getInstructions());

        return interviewSchedulerRepository.save(existingInterview);
    }

    /**
     * Cancel an interview by changing its status.
     *
     * @param interviewId the ID of the interview to cancel
     */
    public void cancelInterview(Long interviewId) {
        InterviewScheduler interview = interviewSchedulerRepository.findById(interviewId)
                .orElseThrow(() -> new IllegalArgumentException("Interview not found with ID: " + interviewId));

        // Change status to "Cancelled"
        interview.setStatus("Cancelled");
        interviewSchedulerRepository.save(interview);
    }

    /**
     * Retrieve all interviews for a specific employer.
     *
     * @param employerId the ID of the employer
     * @return a list of interviews associated with the employer
     */
    public List<InterviewScheduler> getInterviewsByEmployerId(Long employerId) {
        return interviewSchedulerRepository.findByEmployerId(employerId);
    }

    /**
     * Retrieve all interviews for a specific job seeker.
     *
     * @param seekerId the ID of the job seeker
     * @return a list of interviews associated with the job seeker
     */
    public List<InterviewScheduler> getInterviewsBySeekerId(Long seekerId) {
        return interviewSchedulerRepository.findBySeekerId(seekerId);
    }

    /**
     * Retrieve all interviews for a specific job application.
     *
     * @param jobApplicationId the ID of the job application
     * @return a list of interviews associated with the job application
     */
    public List<InterviewScheduler> getInterviewsByJobApplicationId(Long jobApplicationId) {
        return interviewSchedulerRepository.findByJobApplicationId(jobApplicationId);
    }
}