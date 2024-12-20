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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/employer")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Employer> registerEmployer(@RequestBody Employer employer) {
        return ResponseEntity.ok(employerService.registerEmployer(employer));
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

    @PatchMapping("/editJob/{jobId}")
    @ResponseBody
    public ResponseEntity<Job> editJob(@PathVariable Long jobId, @RequestBody Job job) {
        try {
            return ResponseEntity.ok(employerService.editJob(jobId, job));
        } catch (JobNotFoundException e) {
            return ResponseEntity.status(404).body(null);
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
        if (applications.isEmpty()) {
            throw new JobApplicationNotFoundException("Job applications not found for employer id: " + empId);
        }
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

    @PatchMapping("/applications/{applicationId}")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {
        try {
            JobApplication updatedApplication = employerService.updateApplicationStatus(applicationId, status);
            return ResponseEntity.ok(updatedApplication);
        } catch (JobNotFoundException e) {
            return ResponseEntity.status(404).body(null);
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