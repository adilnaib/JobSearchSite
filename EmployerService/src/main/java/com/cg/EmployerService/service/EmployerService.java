package com.cg.EmployerService.service;

import com.cg.EmployerService.exception.EmployerNotFoundException;
import com.cg.EmployerService.exception.JobNotFoundException;
import com.cg.sharedmodule.model.Employer;
import com.cg.EmployerService.repository.EmployerRepository;
import com.cg.sharedmodule.model.Seeker;
import com.cg.sharedmodule.model.Job;
import com.cg.sharedmodule.model.JobApplication;
import com.cg.sharedmodule.repository.JobApplicationRepository;
import com.cg.sharedmodule.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
            throw new EmployerNotFoundException("Employer not found");
        }
        job.setEmployer(employer);
        return jobRepository.save(job);
    }

    public Job editJob(Long jobId, Job job) {
        Job existingJob = jobRepository.findById(jobId).orElseThrow(() -> new JobNotFoundException("Job not found"));
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

    public List<Map<String, Object>> getApplicationsByEmployerId(Long empId) {
        try {
            List<JobApplication> applications = jobApplicationRepository.findByEmpId(empId);
            List<Map<String, Object>> applicationDetails = new ArrayList<>();

            for (JobApplication application : applications) {
                Map<String, Object> details = new HashMap<>();
                details.put("applicationId", application.getApplicationId());
                details.put("status", application.getStatus());

                // Job details
                Job job = application.getJob();
                if (job != null) {
                    details.put("jobId", job.getJobId());
                    details.put("jobTitle", job.getJobTitle());
                    details.put("jobLocation", job.getJobLocation());
                    details.put("jobSalary", job.getJobSalary());
                    details.put("experienceInYears", job.getExperienceInYears());
                    details.put("description", job.getDescription());
                    details.put("requiredSkills", job.getRequiredSkills());
                    details.put("companyName", job.getCompanyName());
                    details.put("jobCompanyEmail", job.getJobCompanyEmail());
                    details.put("jobStatus", job.getJobStatus());
                    details.put("noticePeriodInDays", job.getNoticePeriodInDays());
                }

                // Seeker details
                Seeker seeker = application.getSeeker();
                if (seeker != null) {
                    details.put("seekerId", seeker.getJsId());
                    details.put("seekerName", seeker.getJsName());
                    details.put("seekerEmail", seeker.getJsEmail());
                    details.put("seekerContact", seeker.getJsContact());
                    details.put("seekerAddress", seeker.getJsAddress());
                    details.put("seekerSkills", seeker.getJsSkills());
                }

                applicationDetails.add(details);
            }

            return applicationDetails;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error fetching applications: " + e.getMessage());
        }
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

    public Map<String, Object> updateApplicationStatus(Long applicationId, String newStatus) {
        try {
            JobApplication application = jobApplicationRepository.findById(applicationId)
                    .orElseThrow(() -> new RuntimeException("Application not found"));

            application.setStatus(newStatus);
            application = jobApplicationRepository.save(application);

            Map<String, Object> response = new HashMap<>();
            response.put("applicationId", application.getApplicationId());
            response.put("status", application.getStatus());

            Job job = application.getJob();
            if (job != null) {
                response.put("jobId", job.getJobId());
                response.put("jobTitle", job.getJobTitle());
                response.put("jobLocation", job.getJobLocation());
                response.put("jobSalary", job.getJobSalary());
                response.put("experienceInYears", job.getExperienceInYears());
                response.put("description", job.getDescription());
                response.put("requiredSkills", job.getRequiredSkills());
                response.put("companyName", job.getCompanyName());
                response.put("jobCompanyEmail", job.getJobCompanyEmail());
                response.put("jobStatus", job.getJobStatus());
                response.put("noticePeriodInDays", job.getNoticePeriodInDays());
            }

            Seeker seeker = application.getSeeker();
            if (seeker != null) {
                response.put("seekerId", seeker.getJsId());
                response.put("seekerName", seeker.getJsName());
                response.put("seekerEmail", seeker.getJsEmail());
                response.put("seekerContact", seeker.getJsContact());
                response.put("seekerAddress", seeker.getJsAddress());
                response.put("seekerSkills", seeker.getJsSkills());
            }

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error updating application status: " + e.getMessage());
        }
    }

    public Job viewJob(Long jobId) {
        Job job = jobRepository.findByJobId(jobId);
        if (job == null) {
            throw new JobNotFoundException("Job not found");
        }
        return job;
    }

    public Employer getEmployerByUsername(String username) {
        return employerRepository.findByUsername(username);
    }
}