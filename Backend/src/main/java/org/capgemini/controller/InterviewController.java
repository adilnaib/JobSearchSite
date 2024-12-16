package org.capgemini.controller;

import org.capgemini.model.Interview;
import org.capgemini.services.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/interviews")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    // Create a new interview with job application
    @PostMapping("/create/{applicationId}")
    public ResponseEntity<Interview> createInterviewWithApplication(@PathVariable Long applicationId, @RequestBody Interview interview) {
        Interview createdInterview = interviewService.createInterviewWithApplication(applicationId, interview);
        return ResponseEntity.ok(createdInterview);
    }

    // Get pre-fill data for interview
    @GetMapping("/pre-fill/{applicationId}")
    public ResponseEntity<Map<String, String>> getInterviewPreFillData(@PathVariable Long applicationId) {
        Map<String, String> preFillData = interviewService.getInterviewPreFillData(applicationId);
        return ResponseEntity.ok(preFillData);
    }

    // Create a new interview
    @PostMapping
    public ResponseEntity<Interview> createInterview(@RequestBody Interview interview) {
        Interview createdInterview = interviewService.createInterview(interview);
        return ResponseEntity.ok(createdInterview);
    }

    // Get all interviews
    @GetMapping
    public ResponseEntity<List<Interview>> getAllInterviews() {
        List<Interview> interviews = interviewService.getAllInterviews();
        return ResponseEntity.ok(interviews);
    }

    // Get interview by ID
    @GetMapping("/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Long id) {
        return interviewService.getInterviewById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update an interview
    @PutMapping("/{id}")
    public ResponseEntity<Interview> updateInterview(@PathVariable Long id, @RequestBody Interview interviewDetails) {
        Interview updatedInterview = interviewService.updateInterview(id, interviewDetails);
        if (updatedInterview != null) {
            return ResponseEntity.ok(updatedInterview);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete an interview
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(@PathVariable Long id) {
        interviewService.deleteInterview(id);
        return ResponseEntity.noContent().build();
    }
}
