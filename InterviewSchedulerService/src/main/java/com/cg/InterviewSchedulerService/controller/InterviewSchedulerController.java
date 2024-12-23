package com.cg.InterviewSchedulerService.controller;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.service.InterviewSchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/interview")
public class InterviewSchedulerController {


    @Autowired
    private InterviewSchedulerService interviewSchedulerService;

    // Create a new interview
    @PostMapping("/create/{jobApplicationId}")
    public InterviewScheduler createInterview(@RequestBody InterviewScheduler interviewScheduler, @PathVariable Long jobApplicationId) {
        InterviewScheduler createdScheduler = interviewSchedulerService.createInterview(interviewScheduler, jobApplicationId);

        // Debug: Log the saved interview scheduler
        System.out.println("Created InterviewScheduler: " + createdScheduler);

        return createdScheduler;
    }

    // Update an existing interview
    @PutMapping("/update/{interviewId}")
    public InterviewScheduler updateInterview(@PathVariable Long interviewId, @RequestBody InterviewScheduler updatedInterview) {
        return interviewSchedulerService.updateInterview(interviewId, updatedInterview);
    }

    // Cancel an interview (by employer or seeker)
    @PutMapping("/cancel/{interviewId}")
    public String cancelInterview(@PathVariable Long interviewId) {
        interviewSchedulerService.cancelInterview(interviewId);
        return "Interview with ID " + interviewId + " has been cancelled.";
    }

    // Get all interviews scheduled by an employer
    @GetMapping("/employer/{employerId}")
    public List<InterviewScheduler> getInterviewsByEmployerId(@PathVariable Long employerId) {
        return interviewSchedulerService.getInterviewsByEmployerId(employerId);
    }

    // Get all interviews scheduled for a specific seeker
    @GetMapping("/seeker/{seekerId}")
    public List<InterviewScheduler> getInterviewsBySeekerId(@PathVariable Long seekerId) {
        return interviewSchedulerService.getInterviewsBySeekerId(seekerId);
    }
}