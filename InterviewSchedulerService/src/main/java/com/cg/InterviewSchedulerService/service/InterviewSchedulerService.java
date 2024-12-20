package com.cg.InterviewSchedulerService.service;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.repository.InterviewSchedulerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterviewSchedulerService {

    @Autowired
    private InterviewSchedulerRepository interviewSchedulerRepository;

    // Fetch interviews by employer ID
    public List<InterviewScheduler> getInterviewsByEmployer(Long empId) {
        return interviewSchedulerRepository.findByJobApplicationJobEmployerEmpId(empId);
    }

    // Fetch interviews by seeker ID
    public List<InterviewScheduler> getInterviewsBySeeker(Long seekerId) {
        return interviewSchedulerRepository.findByJobApplicationSeekerJsId(seekerId);
    }

    // Schedule a new interview
    public InterviewScheduler scheduleInterview(InterviewScheduler interviewScheduler) {
        return interviewSchedulerRepository.save(interviewScheduler);
    }

    // Update an existing interview
    public InterviewScheduler updateInterview(Long interviewId, InterviewScheduler interviewScheduler) {
        InterviewScheduler existingInterview = interviewSchedulerRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
        
        existingInterview.setPanelMembers(interviewScheduler.getPanelMembers());
        existingInterview.setInstructions(interviewScheduler.getInstructions());
        existingInterview.setInterviewType(interviewScheduler.getInterviewType());
        
        return interviewSchedulerRepository.save(existingInterview);
    }

    // Cancel an interview by updating its status
    public void cancelInterview(Long interviewId) {
        InterviewScheduler interview = interviewSchedulerRepository.findById(interviewId)
                .orElseThrow(() -> new RuntimeException("Interview not found"));
        
        interview.setInterviewStatus("Cancelled");
        interviewSchedulerRepository.save(interview);
    }
}
