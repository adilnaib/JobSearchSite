package org.capgemini.controller;

import org.capgemini.model.Job;
import org.capgemini.model.Seeker;
import org.capgemini.services.JobSeekerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/jobseeker")
public class JobSeekerController {

    @Autowired
    private JobSeekerService jobSeekerService;

    //Create a jobseeker
    @PostMapping("/register")
    @ResponseBody
    public Seeker registerJobSeeker(@RequestBody Seeker seeker) {
        return jobSeekerService.registerJobSeeker(seeker);
    }

    //View all jobseekers
    @GetMapping("/viewJobSeekers")
    @ResponseBody
    public List<Seeker> viewJobSeekers() {
    	return jobSeekerService.viewJobSeekers();
    }

    //Searching for jobs by jobseeker based on location
    @GetMapping("/searchJobsByLocation/{jobLocation}")
    @ResponseBody
    public List<Job> searchJobsByLocation(@PathVariable String jobLocation) {
    	return jobSeekerService.searchJobsByLocation(jobLocation);
    }

    //Searching for jobs by jobseeker based on jobTitle
    @GetMapping("/searchJobsByTitle/{jobTitle}")
    @ResponseBody
    public List<Job> searchJobsByTitle(@PathVariable String jobTitle) {
    	return jobSeekerService.searchJobsByTitle(jobTitle);
    }

    //Searching for jobs by jobseeker based on experienceInYears
    @GetMapping("/searchJobsByExperienceInYears/{experienceInYears}")
    @ResponseBody
    public List<Job> searchJobsByExperienceInYears(@PathVariable int experienceInYears) {
    	return jobSeekerService.searchJobsByExperienceInYears(experienceInYears);
    }

    //Searching for jobs by jobseeker based on companyName
    @GetMapping("/searchJobsByCompanyName/{companyName}")
    @ResponseBody
    public List<Job> searchJobsByCompanyName(@PathVariable String companyName) {
    	return jobSeekerService.searchJobsByCompanyName(companyName);
    }

    //Searching for jobs by jobseeker based on requiredSkills (from Job)
    @GetMapping("/searchJobsBySkills/{requiredSkills}")
    @ResponseBody
    public List<Job> searchJobsBySkills(@PathVariable List<String> requiredSkills) {
        return jobSeekerService.searchJobsBySkills(requiredSkills);
    }

    //Get Specific job details (basically when jobseeker clicks on a job)
    @GetMapping("/getJobDetails/{jobId}")
    @ResponseBody
    public Job getJobDetails(@PathVariable Long jobId) {
        return jobSeekerService.getJobDetails(jobId);
    }

    //Apply for a job
    @PostMapping("/applyForJob/{jobId}/{seekerId}")
    @ResponseBody
    public String applyForJob(@PathVariable Long jobId, @PathVariable Long seekerId) {
        return jobSeekerService.applyForJob(jobId, seekerId);
    }

    //Delete a job application
    @DeleteMapping("/deleteJobApplication/{applicationId}")
    @ResponseBody
    public void deleteJobApplication(@PathVariable Long applicationId) {
    	jobSeekerService.deleteJobApplication(applicationId);
    }

    //Job Basket Functionalities
    //Adding favourite jobs to job basket
    @PostMapping("/addFavouriteJob/{jobId}/{seekerId}")
    @ResponseBody
    public String addFavouriteJob(@PathVariable Long jobId, @PathVariable Long seekerId) {
        return jobSeekerService.addFavouriteJob(jobId, seekerId);
    }

    //Removing favourite jobs from job basket
    @DeleteMapping("/removeFavouriteJob/{jobId}/{seekerId}")
    @ResponseBody
    public String removeFavouriteJob(@PathVariable Long jobId, @PathVariable Long seekerId) {
        return jobSeekerService.removeFavouriteJob(jobId, seekerId);
    }

    //View all jobs in job basket
    @GetMapping("/viewFavouriteJobs/{seekerId}")
    @ResponseBody
    public List<Job> viewFavouriteJobs(@PathVariable Long seekerId) {
        return jobSeekerService.viewFavouriteJobs(seekerId);
    }

}
