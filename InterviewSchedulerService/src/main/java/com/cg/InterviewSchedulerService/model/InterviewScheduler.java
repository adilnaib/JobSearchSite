package com.cg.InterviewSchedulerService.model;

import com.cg.sharedmodule.model.JobApplication;
import jakarta.persistence.*;


import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class InterviewScheduler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interviewId;

    private LocalDate date;
    private LocalTime time;
    private String location;
    private String meetingLink;
    private String panelMembers; // Comma-separated panel member names
    private String interviewMode; // e.g., "Online" or "Offline"
    private String interviewType; // e.g., "Technical", "HR", "Managerial"
    private String instructions;

    private String status; // e.g., "Scheduled", "Cancelled"

    // Relationship with Job Application
    @ManyToOne
    @JoinColumn(name = "job_application_id", referencedColumnName = "applicationId")
    private JobApplication jobApplication;

    // Additional attributes to store job seeker details
    private String seekerName;
    private String seekerEmail;
    private String seekerContact;

    // Additional attributes to store employer details
    private String employerName;
    private String employerContact;

    // Additional attributes to store job details
    private String jobTitle;
    private String jobLocation;
    private double jobSalary;

    public Long getInterviewId() {
        return interviewId;
    }

    public void setInterviewId(Long interviewId) {
        this.interviewId = interviewId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
    }

    public String getPanelMembers() {
        return panelMembers;
    }

    public void setPanelMembers(String panelMembers) {
        this.panelMembers = panelMembers;
    }

    public String getInterviewMode() {
        return interviewMode;
    }

    public void setInterviewMode(String interviewMode) {
        this.interviewMode = interviewMode;
    }

    public String getInterviewType() {
        return interviewType;
    }

    public void setInterviewType(String interviewType) {
        this.interviewType = interviewType;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public JobApplication getJobApplication() {
        return jobApplication;
    }

    public void setJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
    }

    public String getSeekerName() {
        return seekerName;
    }

    public void setSeekerName(String seekerName) {
        this.seekerName = seekerName;
    }

    public String getSeekerEmail() {
        return seekerEmail;
    }

    public void setSeekerEmail(String seekerEmail) {
        this.seekerEmail = seekerEmail;
    }

    public String getSeekerContact() {
        return seekerContact;
    }

    public void setSeekerContact(String seekerContact) {
        this.seekerContact = seekerContact;
    }

    public String getEmployerName() {
        return employerName;
    }

    public void setEmployerName(String employerName) {
        this.employerName = employerName;
    }

    public String getEmployerContact() {
        return employerContact;
    }

    public void setEmployerContact(String employerContact) {
        this.employerContact = employerContact;
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

    public double getJobSalary() {
        return jobSalary;
    }

    public void setJobSalary(double jobSalary) {
        this.jobSalary = jobSalary;
    }

    /**
     * Sets job-related details from the associated job application.
     * This is useful when an InterviewScheduler is created.
     */
    public void setDetailsFromJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
        if (jobApplication.getSeeker() != null) {
            this.seekerName = jobApplication.getSeeker().getJsName();
            this.seekerEmail = jobApplication.getSeeker().getJsEmail();
            this.seekerContact = jobApplication.getSeeker().getJsContact();
        }
        if (jobApplication.getJob() != null) {
            this.jobTitle = jobApplication.getJob().getJobTitle();
            this.jobLocation = jobApplication.getJob().getJobLocation();
            this.jobSalary = jobApplication.getJob().getJobSalary();
            if (jobApplication.getJob().getEmployer() != null) {
                this.employerName = jobApplication.getJob().getEmployer().getEmpName();
                this.employerContact = jobApplication.getJob().getEmployer().getEmpContact();
            }
        }
    }
}