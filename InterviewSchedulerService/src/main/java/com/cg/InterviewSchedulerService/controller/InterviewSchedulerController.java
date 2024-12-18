package com.cg.InterviewSchedulerService.controller;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.service.InterviewSchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/interviews")
public class InterviewSchedulerController {

    @Autowired
    private InterviewSchedulerService interviewSchedulerService;

    @PostMapping
    public InterviewScheduler createInterviewSchedule(@RequestBody InterviewScheduler interviewScheduler) {
        return interviewSchedulerService.createInterviewSchedule(interviewScheduler);
    }

    // Get all interview schedules
    @GetMapping
    public List<InterviewScheduler> getAllInterviewSchedules() {
        return interviewSchedulerService.getAllInterviewSchedules();
    }

    // Get interview schedule by ID
    @GetMapping("/{id}")
    public InterviewScheduler getInterviewScheduleById(@PathVariable Long id) {
        return interviewSchedulerService.getInterviewScheduleById(id);
    }

    // Update an interview schedule
    @PutMapping("/{id}")
    public InterviewScheduler updateInterviewSchedule(
            @PathVariable Long id,
            @RequestBody InterviewScheduler updatedInterviewScheduler) {
        return interviewSchedulerService.updateInterviewSchedule(id, updatedInterviewScheduler);
    }

    // Cancel an interview schedule (set status to "Cancelled")
    @PutMapping("/{id}/cancel")
    public InterviewScheduler cancelInterviewSchedule(@PathVariable Long id) {
        return interviewSchedulerService.cancelInterviewSchedule(id);
    }

    // Fetch job details via interview schedule
    @GetMapping("/{id}/job-details")
    public String fetchJobDetails(@PathVariable Long id) {
        InterviewScheduler interviewScheduler = interviewSchedulerService.getInterviewScheduleById(id);
        return String.format("Job Title: %s, Job Location: %s",
                interviewScheduler.getJobTitle(),
                interviewScheduler.getJobLocation());
    }

    // Fetch seeker details via interview schedule
    @GetMapping("/{id}/seeker-details")
    public String fetchSeekerDetails(@PathVariable Long id) {
        InterviewScheduler interviewScheduler = interviewSchedulerService.getInterviewScheduleById(id);

        if (interviewScheduler.getJobApplication() != null &&
                interviewScheduler.getJobApplication().getSeeker() != null) {
            return String.format("Seeker Name: %s, Contact: %s, Email: %s",
                    interviewScheduler.getJobApplication().getSeeker().getJsName(),
                    interviewScheduler.getJobApplication().getSeeker().getJsContact(),
                    interviewScheduler.getJobApplication().getSeeker().getJsEmail());
        }
        return "No seeker details available.";
    }

}
