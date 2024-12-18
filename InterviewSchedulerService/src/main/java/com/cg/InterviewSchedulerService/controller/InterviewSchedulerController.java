package com.cg.InterviewSchedulerService.controller;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import com.cg.InterviewSchedulerService.service.InterviewSchedulerService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/interviews")
public class InterviewSchedulerController {

    private static final Logger logger = LoggerFactory.getLogger(InterviewSchedulerController.class);

    @Autowired
    private InterviewSchedulerService interviewSchedulerService;

    @PostMapping
    public ResponseEntity<InterviewScheduler> createInterview(@RequestBody InterviewScheduler interview) {
        logger.info("Request to create a new interview: {}", interview);
        return new ResponseEntity<>(interviewSchedulerService.createInterview(interview), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<InterviewScheduler>> getAllInterviews() {
        logger.info("Fetching all interviews");
        return new ResponseEntity<>(interviewSchedulerService.getAllInterviews(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewScheduler> getInterviewById(@PathVariable Long id) {
        Optional<InterviewScheduler> interview = interviewSchedulerService.getInterviewById(id);
        return interview.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewScheduler> updateInterview(@PathVariable Long id, @RequestBody InterviewScheduler details) {
        return new ResponseEntity<>(interviewSchedulerService.updateInterview(id, details), HttpStatus.OK);
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<InterviewScheduler> cancelInterview(@PathVariable Long id) {
        return new ResponseEntity<>(interviewSchedulerService.cancelInterview(id), HttpStatus.OK);
    }
}
