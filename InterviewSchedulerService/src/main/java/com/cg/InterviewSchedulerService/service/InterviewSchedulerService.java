package com.cg.InterviewSchedulerService.service;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.repository.InterviewSchedulerRepository;
import com.cg.sharedmodule.model.JobApplication;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class InterviewSchedulerService {

    
    

    // Create a new interview
    @Autowired
    private InterviewSchedulerRepository interviewSchedulerRepository;

    // Create a new interview schedule
    public InterviewScheduler createInterviewSchedule(InterviewScheduler interviewScheduler) {
        return interviewSchedulerRepository.save(interviewScheduler);
    }

    // Get all interview schedules
    public List<InterviewScheduler> getAllInterviewSchedules() {
        return interviewSchedulerRepository.findAll();
    }

    // Get interview schedule by ID
    public InterviewScheduler getInterviewScheduleById(Long id) {
        return interviewSchedulerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Interview Scheduler not found for ID: " + id));
    }

    // Update an interview schedule
    public InterviewScheduler updateInterviewSchedule(Long id, InterviewScheduler updatedInterviewScheduler) {
        InterviewScheduler existingSchedule = getInterviewScheduleById(id);

        existingSchedule.setCandidate(updatedInterviewScheduler.getCandidate());
        existingSchedule.setPosition(updatedInterviewScheduler.getPosition());
        existingSchedule.setDate(updatedInterviewScheduler.getDate());
        existingSchedule.setTime(updatedInterviewScheduler.getTime());
        existingSchedule.setInterviewMode(updatedInterviewScheduler.getInterviewMode());
        existingSchedule.setLocation(updatedInterviewScheduler.getLocation());
        existingSchedule.setInterviewType(updatedInterviewScheduler.getInterviewType());
        existingSchedule.setPanelMembers(updatedInterviewScheduler.getPanelMembers());
        existingSchedule.setMeetingLink(updatedInterviewScheduler.getMeetingLink());
        existingSchedule.setInstructions(updatedInterviewScheduler.getInstructions());
        existingSchedule.setStatus(updatedInterviewScheduler.getStatus());
        existingSchedule.setJobApplication(updatedInterviewScheduler.getJobApplication());

        return interviewSchedulerRepository.save(existingSchedule);
    }

    // Cancel an interview schedule (Set status to "Cancelled")
    public InterviewScheduler cancelInterviewSchedule(Long id) {
        InterviewScheduler existingSchedule = getInterviewScheduleById(id);

        // Update the status to "Cancelled"
        existingSchedule.setStatus("Cancelled");

        return interviewSchedulerRepository.save(existingSchedule);
    }
}
