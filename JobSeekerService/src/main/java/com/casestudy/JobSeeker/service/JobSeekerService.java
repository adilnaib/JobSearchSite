package com.casestudy.JobSeeker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.casestudy.Job.model.Job;
import com.casestudy.Job.repository.JobRepository;
import com.casestudy.JobApplication.model.JobApplication;
import com.casestudy.JobSeeker.model.Seeker;
import com.casestudy.JobSeeker.repository.JobSeekerRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobSeekerService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private JobSeekerRepository jobApplicationRepository;

    public List<Job> searchJobsByLocation(String location) {
        return jobRepository.findByJobLocation(location);
    }

    public List<Job> searchJobsByTitle(String jobTitle) {
        return jobRepository.findByJobTitle(jobTitle);
    }

    public List<Job> searchJobsByExperienceInYears(int experienceInYears) {
        return jobRepository.findByExperienceInYears(experienceInYears);
    }

    public List<Job> searchJobsByCompanyName(String companyName) {
        return jobRepository.findByCompanyName(companyName);
    }

    public Seeker registerJobSeeker(Seeker seeker) {
        return jobSeekerRepository.save(seeker);
    }

    public List<Job> searchJobsBySkills(List<String> requiredSkills) {
        return requiredSkills.stream()
                .flatMap(skill -> jobRepository.findByRequiredSkills(skill).stream())
                .distinct()
                .collect(Collectors.toList());
    }

    public Job getJobDetails(Long jobId) {
        return jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
    }

    public String applyForJob(Long jobId, Long seekerId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        Seeker seeker = jobSeekerRepository.findById(seekerId).orElseThrow(() -> new RuntimeException("Seeker not found"));

        JobApplication jobApplication = new JobApplication();
        jobApplication.setJob(job);
        jobApplication.setSeeker(seeker);
        jobApplication.setStatus("Applied");

        jobApplicationRepository.save(jobApplication);

        return "Applied for job: " + job.getJobTitle() + " You're application id is: "+ jobApplication.getApplicationId();
    }

    public void deleteJobApplication(Long applicationId) {
        jobApplicationRepository.deleteById(applicationId);
    }

    public String addFavouriteJob(Long jobId, Long seekerId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        Seeker seeker = jobSeekerRepository.findById(seekerId).orElseThrow(() -> new RuntimeException("Seeker not found"));

        seeker.getFavouriteJobs().add(job);
        jobSeekerRepository.save(seeker);

        return "Added job to favourites: " + job.getJobTitle();
    }

    public String removeFavouriteJob(Long jobId, Long seekerId) {
        Job job = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        Seeker seeker = jobSeekerRepository.findById(seekerId).orElseThrow(() -> new RuntimeException("Seeker not found"));

        seeker.getFavouriteJobs().remove(job);
        jobSeekerRepository.save(seeker);

        return "Removed job from favourites: " + job.getJobTitle();
    }

    public List<Job> viewFavouriteJobs(Long seekerId) {
        Seeker seeker = jobSeekerRepository.findById(seekerId).orElseThrow(() -> new RuntimeException("Seeker not found"));
        return seeker.getFavouriteJobs();
    }

    public List<Seeker> viewJobSeekers() {
        return jobSeekerRepository.findAll();
    }
}
