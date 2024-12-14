package com.casestudy.Job.model;

import java.util.List;

import org.springframework.data.annotation.Id;

import com.casestudy.Employer.model.Employer;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobId;
    private String jobTitle;
    private String jobLocation;
    private String description;
    private int experienceInYears;
    private double jobSalary;
    private int noticePeriodInDays;
    private String companyName;
    private String jobCompanyEmail;
    private String jobStatus;
    @ElementCollection
    private List<String> requiredSkills;
    @ManyToOne
    @JoinColumn(name = "emp_id")
    @JsonIgnore
    private Employer employer;

    public Long getJobId() {
        return jobId;
    }

    public void setJobId(Long jobId) {
        this.jobId = jobId;
    }

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getJobLocation() {
        return jobLocation;
    }

    public void setJobLocation(String jobLocation) {
        this.jobLocation = jobLocation;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getExperienceInYears() {
        return experienceInYears;
    }

    public void setExperienceInYears(int experienceInYears) {
        this.experienceInYears = experienceInYears;
    }

    public double getJobSalary() {
        return jobSalary;
    }

    public void setJobSalary(double jobSalary) {
        this.jobSalary = jobSalary;
    }

    public int getNoticePeriodInDays() {
        return noticePeriodInDays;
    }

    public void setNoticePeriodInDays(int noticePeriodInDays) {
        this.noticePeriodInDays = noticePeriodInDays;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getJobCompanyEmail() {
        return jobCompanyEmail;
    }

    public void setJobCompanyEmail(String jobCompanyEmail) {
        this.jobCompanyEmail = jobCompanyEmail;
    }

    public String getJobStatus() {
        return jobStatus;
    }

    public void setJobStatus(String jobStatus) {
        this.jobStatus = jobStatus;
    }

    public List<String> getRequiredSkills() {
        return requiredSkills;
    }

    public void setRequiredSkills(List<String> requiredSkills) {
        this.requiredSkills = requiredSkills;
    }

    public Employer getEmployer() {
        return employer;
    }

    public void setEmployer(Employer employer) {
        this.employer = employer;
    }
}
