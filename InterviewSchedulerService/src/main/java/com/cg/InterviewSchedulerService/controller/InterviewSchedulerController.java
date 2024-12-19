package com.cg.InterviewSchedulerService.controller;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.service.InterviewSchedulerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interviews")
public class InterviewSchedulerController {

    @Autowired
    private InterviewSchedulerService interviewSchedulerService;

    // Fetch interviews by employer ID
    @GetMapping("/employer/{empId}")
    public ResponseEntity<List<InterviewScheduler>> getInterviewsByEmployer(@PathVariable Long empId) {
        List<InterviewScheduler> interviews = interviewSchedulerService.getInterviewsByEmployer(empId);
        return ResponseEntity.ok(interviews);
    }

    // Fetch interviews by seeker ID
    @GetMapping("/seeker/{seekerId}")
    public ResponseEntity<List<InterviewScheduler>> getInterviewsBySeeker(@PathVariable Long seekerId) {
        List<InterviewScheduler> interviews = interviewSchedulerService.getInterviewsBySeeker(seekerId);
        return ResponseEntity.ok(interviews);
    }

    // Schedule a new interview
    @PostMapping("/schedule")
    public ResponseEntity<InterviewScheduler> scheduleInterview(@RequestBody InterviewScheduler interviewScheduler) {
        InterviewScheduler scheduledInterview = interviewSchedulerService.scheduleInterview(interviewScheduler);
        return ResponseEntity.ok(scheduledInterview);
    }

    // Update an existing interview
    @PutMapping("/update/{interviewId}")
    public ResponseEntity<InterviewScheduler> updateInterview(
            @PathVariable Long interviewId,
            @RequestBody InterviewScheduler interviewScheduler) {
        InterviewScheduler updatedInterview = interviewSchedulerService.updateInterview(interviewId, interviewScheduler);
        return ResponseEntity.ok(updatedInterview);
    }

    // Cancel an interview
    @PutMapping("/cancel/{interviewId}")
    public ResponseEntity<String> cancelInterview(@PathVariable Long interviewId) {
        interviewSchedulerService.cancelInterview(interviewId);
        return ResponseEntity.ok("Interview status updated to Cancelled");
    }
}
