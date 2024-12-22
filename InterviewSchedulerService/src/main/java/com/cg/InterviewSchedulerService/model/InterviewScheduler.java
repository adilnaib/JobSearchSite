package com.cg.InterviewSchedulerService.model;

import com.cg.sharedmodule.model.JobApplication;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
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
