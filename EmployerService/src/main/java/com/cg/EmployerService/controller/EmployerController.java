package com.cg.EmployerService.controller;

import com.cg.EmployerService.exception.EmployerNotFoundException;
import com.cg.EmployerService.exception.JobNotFoundException;
import com.cg.EmployerService.exception.JobApplicationNotFoundException;
import com.cg.sharedmodule.model.Employer;
import com.cg.sharedmodule.model.Seeker;
import com.cg.sharedmodule.model.JobApplication;
import com.cg.EmployerService.service.EmployerService;
import com.cg.sharedmodule.model.Job;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employer")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Employer> registerEmployer(@RequestBody Employer employer) {
        return ResponseEntity.ok(employerService.registerEmployer(employer));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginEmployer(@RequestBody Map<String, String> credentials) {
        Map<String, Object> response = employerService.loginEmployer(
            credentials.get("username"), 
            credentials.get("password")
        );
        return ResponseEntity.ok(response);
    }

    @PostMapping("/addJob/{empId}")
    @ResponseBody
    public ResponseEntity<Job> postJob(@RequestBody Job job, @PathVariable Long empId) {
        try {
            return ResponseEntity.ok(employerService.postJob(job, empId));
        } catch (EmployerNotFoundException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/profile/{username}")
    @ResponseBody
    public ResponseEntity<Employer> getEmployerByUsername(@PathVariable String username) {
        Employer employer = employerService.getEmployerByUsername(username);
        if (employer == null) {
            throw new EmployerNotFoundException("Employer not found with username: " + username);
        }
        return ResponseEntity.ok(employer);
    }

    @PutMapping("/editJob/{jobId}")
    public ResponseEntity<Job> editJob(@PathVariable Long jobId, @RequestBody Job updatedJob) {
        try {
            Job job = employerService.editJob(jobId, updatedJob);
            return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                .header("Access-Control-Allow-Headers", "*")
                .body(job);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                .header("Access-Control-Allow-Headers", "*")
                .body(null);
        }
    }

    @GetMapping("/{empId}")
    @ResponseBody
    public ResponseEntity<Employer> getEmployerById(@PathVariable Long empId) {
        Employer employer = employerService.getEmployerById(empId);
        if (employer == null) {
            throw new EmployerNotFoundException("Employer not found with id: " + empId);
        }
        return ResponseEntity.ok(employer);
    }

    @DeleteMapping("/deleteJob/{jobId}")
    @ResponseBody
    public ResponseEntity<Void> deleteJob(@PathVariable Long jobId) {
        employerService.deleteJob(jobId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getJob/{empId}")
    @ResponseBody
    public ResponseEntity<List<Job>> viewJobs(@PathVariable Long empId) {
        return ResponseEntity.ok(employerService.viewJobs(empId));
    }

    @GetMapping("/getApplications/{empId}")
    @ResponseBody
    public ResponseEntity<List<JobApplication>> getApplicationsByEmpId(@PathVariable Long empId) {
        List<JobApplication> applications = employerService.getApplicationsByEmpId(empId);
        return ResponseEntity.ok(applications);
    }

    @GetMapping("/getJobseekers/{skillset}")
    @ResponseBody
    public ResponseEntity<List<Seeker>> searchJobSeekerBySkillSet(@PathVariable List<String> skillset) {
        return ResponseEntity.ok(employerService.searchJobSeekerBySkillSet(skillset));
    }

    @GetMapping("/jobseekers/{jobId}")
    @ResponseBody
    public ResponseEntity<List<Map<String, Object>>> searchJobSeekerByJobId(@PathVariable Long jobId) {
        return ResponseEntity.ok(employerService.searchJobSeekerByJobId(jobId));
    }

    @GetMapping("/applications/{empId}")
    public ResponseEntity<List<Map<String, Object>>> getApplicationsByEmployerId(@PathVariable Long empId) {
        try {
            List<Map<String, Object>> applications = employerService.getApplicationsByEmployerId(empId);
            return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                .header("Access-Control-Allow-Headers", "*")
                .body(applications);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                .header("Access-Control-Allow-Headers", "*")
                .body(null);
        }
    }

    @PutMapping("/updateApplication/{applicationId}")
    public ResponseEntity<Map<String, Object>> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody Map<String, String> statusUpdate) {
        try {
            Map<String, Object> updatedApplication = employerService.updateApplicationStatus(
                applicationId, 
                statusUpdate.get("status")
            );
            return ResponseEntity.ok()
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                .header("Access-Control-Allow-Headers", "*")
                .body(updatedApplication);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .header("Access-Control-Allow-Origin", "http://localhost:3000")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
                .header("Access-Control-Allow-Headers", "*")
                .body(null);
        }
    }

    @GetMapping("/getjob/{empId}/{jobId}")
    @ResponseBody
    public ResponseEntity<Job> viewJob(@PathVariable Long empId, @PathVariable Long jobId) {
        try {
            return ResponseEntity.ok(employerService.viewJob(jobId));
        } catch (JobNotFoundException e) {
            return ResponseEntity.status(404).body(null);
        }
    }
}