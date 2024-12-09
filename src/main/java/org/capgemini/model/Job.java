package org.capgemini.model;

public class Job {
    private String jobTitle;
    private String jobLocation;
    private int experienceInYears;
    private double jobSalary;
    private int noticePeriodInDays;
    private String jobCompanyEmail;
    private String jobStatus;

    public Job(String jobTitle, String jobLocation, int experienceInYears, double jobSalary, int noticePeriodInDays, String jobCompanyEmail, String jobStatus) {
        this.jobTitle = jobTitle;
        this.jobLocation = jobLocation;
        this.experienceInYears = experienceInYears;
        this.jobSalary = jobSalary;
        this.noticePeriodInDays = noticePeriodInDays;
        this.jobCompanyEmail = jobCompanyEmail;
        this.jobStatus = jobStatus;
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
}
