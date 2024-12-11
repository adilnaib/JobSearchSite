package org.capgemini.controller;

import org.capgemini.model.Employer;
import org.capgemini.model.Job;
import org.capgemini.model.JobApplication;
import org.capgemini.model.Seeker;
import org.capgemini.services.EmployerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employer")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

//    @PostMapping("/register")
//    public ResponseEntity<Employer> registerEmployer(@RequestBody Employer employer) {
//        return ResponseEntity.ok(employerService.registerEmployer(employer));
//    }
    
    @PostMapping("/jobs")
    public Job postJob(@RequestBody Job job) {
    	return employerService.postJob(job);
    }

    @PutMapping("/jobs/{jobId}")
    public Job editJob(@PathVariable Long jobId, @RequestBody Job job) {
        return employerService.editJob(jobId, job);
    }
    
    @GetMapping("/{empId}")
    public Employer getEmployerById(@PathVariable Long empId) {
        return employerService.getEmployerById(empId);
    }
    
    @DeleteMapping("/jobs/{jobId}")
    public void deleteJob(@PathVariable Long jobId) {
    	employerService.deleteJob(jobId);
    }
    
    @GetMapping("/jobs")
    public List<Job> viewJobs(Long empId){
    	return employerService.viewJobs(empId);
    }

    @GetMapping("/{empId}/applications")
    public List<JobApplication> getApplicationsByEmpId(@PathVariable Long empId) {
        return employerService.getApplicationsByEmpId(empId);
    }
    
    @GetMapping("/jobseekers/skills")
    public List<Seeker> searchJobSeekerBySkillSet(@RequestParam String skillset){
    	return employerService.searchJobSeekerBySkillSet(skillset);
    }
    
    @GetMapping("/jobseekers/{jobId}")
    public List<Seeker> searchJobSeekerByJobId(@PathVariable Long jobId){
    	return employerService.searchJobSeekerByJobId(jobId);
    }

    @PutMapping("/applications/{applicationId}")
    public ResponseEntity<JobApplication> updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestParam String status) {
        return ResponseEntity.ok(employerService.updateApplicationStatus(applicationId, status));
    }

    @GetMapping("/jobs/{jobId}")
    public Job viewJob(@PathVariable Long jobId) {
        return employerService.viewJob(jobId);
    }
}
