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

import java.util.List;

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
    
    public Job postJob(Job job) {
    	return jobRepository.save(job);
    }
    
    public Job editJob(Long jobId, Job updatedJob) {
        return jobRepository.findById(jobId).map(job -> {
            job.setJobTitle(updatedJob.getJobTitle());
            job.setJobLocation(updatedJob.getJobLocation());
            job.setDescription(updatedJob.getDescription());
            job.setExperienceInYears(updatedJob.getExperienceInYears());
            job.setJobSalary(updatedJob.getJobSalary());
            job.setNoticePeriodInDays(updatedJob.getNoticePeriodInDays());
            job.setJobCompanyEmail(updatedJob.getJobCompanyEmail());
            job.setJobStatus(updatedJob.getJobStatus());
            return jobRepository.save(job);
        }).orElseThrow(() -> new RuntimeException("Job not found"));
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
    
    public List<Seeker> searchJobSeekerByJobId(Long jobId){
    	return jobApplicationRepository.findSeekerByJobId(jobId);
    }
    
    public List<Seeker> searchJobSeekerBySkillSet( String skillset){
    	return jobApplicationRepository.findSeekerBySkillset(skillset);
    }
    public JobApplication updateApplicationStatus(Long applicationId, String status) {
        JobApplication application = jobApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new RuntimeException("Application not found"));
        application.setStatus(status);
        return jobApplicationRepository.save(application);
    }

	
}
