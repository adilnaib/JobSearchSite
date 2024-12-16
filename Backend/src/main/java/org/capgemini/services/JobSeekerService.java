package org.capgemini.services;

import org.capgemini.Exception.SeekerException;
import org.capgemini.model.Job;
import org.capgemini.model.JobApplication;
import org.capgemini.model.Seeker;
import org.capgemini.repository.JobApplicationRepository;
import org.capgemini.repository.JobRepository;
import org.capgemini.repository.JobSeekerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobSeekerService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

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
        return jobRepository.findById(jobId)
                .orElseThrow(() -> new SeekerException("Job with ID " + jobId + " not found"));
    }


    public String applyForJob(Long jobId, Long seekerId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new SeekerException("Job with ID " + jobId + " not found"));
        Seeker seeker = jobSeekerRepository.findById(seekerId)
                .orElseThrow(() -> new SeekerException("Seeker with ID " + seekerId + " not found"));

        boolean alreadyApplied = jobApplicationRepository.existsByJobAndSeeker(job, seeker);
        if (alreadyApplied) {
            return "You have already applied";
        }

        JobApplication jobApplication = new JobApplication();
        jobApplication.setJob(job);
        jobApplication.setSeeker(seeker);
        jobApplication.setStatus("Applied");

        jobApplicationRepository.save(jobApplication);

        return "Applied for job: " + job.getJobTitle() + " Your application ID is: " + jobApplication.getApplicationId();
    }

    public void deleteJobApplication(Long applicationId) {
        if (!jobApplicationRepository.existsById(applicationId)) {
            throw new SeekerException("Job application with ID " + applicationId + " not found");
        }
        jobApplicationRepository.deleteById(applicationId);
    }

    public String addFavouriteJob(Long jobId, Long seekerId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new SeekerException("Job with ID " + jobId + " not found"));
        Seeker seeker = jobSeekerRepository.findById(seekerId)
                .orElseThrow(() -> new SeekerException("Seeker with ID " + seekerId + " not found"));

        seeker.getFavouriteJobs().add(job);
        jobSeekerRepository.save(seeker);

        return "Added job to favourites: " + job.getJobTitle();
    }

    public String removeFavouriteJob(Long jobId, Long seekerId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new SeekerException("Job with ID " + jobId + " not found"));
        Seeker seeker = jobSeekerRepository.findById(seekerId)
                .orElseThrow(() -> new SeekerException("Seeker with ID " + seekerId + " not found"));

        if (!seeker.getFavouriteJobs().remove(job)) {
            throw new SeekerException("Job with ID " + jobId + " is not in the favourites of seeker with ID " + seekerId);
        }
        jobSeekerRepository.save(seeker);

        return "Removed job from favourites: " + job.getJobTitle();
    }

    public List<Job> viewFavouriteJobs(Long seekerId) {
        Seeker seeker = jobSeekerRepository.findById(seekerId)
                .orElseThrow(() -> new SeekerException("Seeker with ID " + seekerId + " not found"));
        return seeker.getFavouriteJobs();
    }

    public List<Seeker> viewJobSeekers() {
        return jobSeekerRepository.findAll();
    }

    public List<Job> viewAllJobs() {
        return jobRepository.findAll();
    }
}
