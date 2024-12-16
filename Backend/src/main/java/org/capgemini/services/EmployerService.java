package org.capgemini.services;

import org.capgemini.model.Employer;
import org.capgemini.model.Job;
import org.capgemini.model.JobApplication;
import org.capgemini.model.Seeker;
import org.capgemini.repository.EmployerRepository;
import org.capgemini.repository.JobApplicationRepository;
import org.capgemini.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class EmployerService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private JobApplicationRepository jobApplicationRepository;

    public Employer registerEmployer(Employer employer) {
        return employerRepository.save(employer);
    }

    public Employer getEmployerById(Long empId) {
        return employerRepository.findByEmpId(empId);
    }

    public Job postJob(Job job, Long empId) {
        Employer employer = employerRepository.findByEmpId(empId);
        if (employer == null) {
            throw new RuntimeException("Employer not found");
        }
        job.setEmployer(employer);
        return jobRepository.save(job);
    }

    public Job editJob(Long jobId, Job job) {
        Job existingJob = jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found"));
        if (job.getJobTitle() != null) {
            existingJob.setJobTitle(job.getJobTitle());
        }
        if (job.getCompanyName() != null) {
            existingJob.setCompanyName(job.getCompanyName());
        }
        if (job.getJobLocation() != null) {
            existingJob.setJobLocation(job.getJobLocation());
        }
        if (job.getExperienceInYears() != 0) {
            existingJob.setExperienceInYears(job.getExperienceInYears());
        }
        if (job.getJobSalary() != 0) {
            existingJob.setJobSalary(job.getJobSalary());
        }
        if (job.getRequiredSkills() != null) {
            existingJob.setRequiredSkills(job.getRequiredSkills());
        }
        return jobRepository.save(existingJob);
    }

    public List<Job> viewJobs(Long empId) {
        return jobRepository.findByEmployer_EmpId(empId);
    }

    public void deleteJob(Long jobId) {
        jobRepository.deleteById(jobId);
    }

    public List<JobApplication> getApplicationsByEmpId(Long empId) {
        return jobApplicationRepository.findByEmpId(empId);
    }

    public List<Map<String, Object>> searchJobSeekerByJobId(Long jobId) {
        return jobApplicationRepository.findSeekerByJobId(jobId).stream().map(seeker -> {
            Map<String, Object> seekerInfo = new HashMap<>();
            seekerInfo.put("jsId", seeker.getJsId());
            seekerInfo.put("jsName", seeker.getJsName());
            seekerInfo.put("jsAddress", seeker.getJsAddress());
            seekerInfo.put("jsContact", seeker.getJsContact());
            seekerInfo.put("jsEmail", seeker.getJsEmail());
            seekerInfo.put("jsSkills", seeker.getJsSkills());
            return seekerInfo;
        }).collect(Collectors.toList());
    }

    public List<Seeker> searchJobSeekerBySkillSet(List<String> skillset) {
        return skillset.stream()
                .flatMap(skill -> jobApplicationRepository.findSeekerBySkillset(skill).stream())
                .distinct()
                .collect(Collectors.toList());
    }

    public JobApplication updateApplicationStatus(Long applicationId, String status) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        return jobApplicationRepository.save(application);
    }

    public Job viewJob(Long jobId) {
        return jobRepository.findByJobId(jobId);
    }
}