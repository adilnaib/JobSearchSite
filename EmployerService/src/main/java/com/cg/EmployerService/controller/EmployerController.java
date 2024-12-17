package com.cg.EmployerService.controller;

import com.cg.EmployerService.model.Employer;
import com.cg.EmployerService.model.Job;
import com.cg.EmployerService.model.JobApplication;
import com.cg.EmployerService.model.Seeker;
import com.cg.EmployerService.service.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
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

    @GetMapping("/{empId}")
    @ResponseBody
    public Employer getEmployerById(@PathVariable Long empId) {
        return employerService.getEmployerById(empId);
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<Employer> registerEmployer(@RequestBody Employer employer) {
        return ResponseEntity.ok(employerService.registerEmployer(employer));
    }

    @GetMapping("/getJob/{empId}")
    @ResponseBody
    public List<Job> viewJobs(@PathVariable Long empId) {
        return employerService.viewJobs(empId);
    }

    @GetMapping("/getjob/{empId}/{jobId}")
    @ResponseBody
    public Job viewJob(@PathVariable Long empId, @PathVariable Long jobId) {
        return employerService.viewJob(jobId);
    }

    @PostMapping("/addJob/{empId}")
    @ResponseBody
    public Job postJob(@RequestBody Job job, @PathVariable Long empId) {
        return employerService.postJob(job, empId);
    }

    @PatchMapping("/editJob/{jobId}")
    @ResponseBody
    public Job editJob(@PathVariable Long jobId, @RequestBody Job job) {
        return employerService.editJob(jobId, job);
    }

    @DeleteMapping("/deleteJob/{jobId}")
    @ResponseBody
    public void deleteJob(@PathVariable Long jobId) {
        employerService.deleteJob(jobId);
    }

    @GetMapping("/getApplications/{empId}")
    @ResponseBody
    public List<JobApplication> getApplicationsByEmpId(@PathVariable Long empId) {
        return employerService.getApplicationsByEmpId(empId);
    }

    @PatchMapping("/applications/{applicationId}")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {
        JobApplication updatedApplication = employerService.updateApplicationStatus(applicationId, status);
        return ResponseEntity.ok(updatedApplication);
    }

    @GetMapping("/jobseekers/{jobId}")
    @ResponseBody
    public List<Map<String, Object>> searchJobSeekerByJobId(@PathVariable Long jobId) {
        return employerService.searchJobSeekerByJobId(jobId);
    }

    @GetMapping("/getJobseekers/{skillset}")
    @ResponseBody
    public List<Seeker> searchJobSeekerBySkillSet(@PathVariable List<String> skillset) {
        return employerService.searchJobSeekerBySkillSet(skillset);
    }
}
