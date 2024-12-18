package com.cg.InterviewSchedulerService.model;

import com.cg.sharedmodule.model.JobApplication;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
public class InterviewScheduler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Candidate name is required")
    private String candidate;

    @NotBlank(message = "Position is required")
    private String position;

    @NotBlank(message = "Date is required")
    private String date;

    @NotBlank(message = "Time is required")
    private String time;

    @NotBlank(message = "Interview mode is required")
    private String interviewMode;

    private String location;

    @NotBlank(message = "Interview type is required")
    private String interviewType;

    private String panelMembers;
    private String meetingLink;
    private String instructions;
    private String status = "Scheduled";

    // Many-to-one relationship with JobApplication entity
    @ManyToOne
    @JoinColumn(name = "application_id")
    private JobApplication jobApplication;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCandidate() {
        return candidate;
    }

    public void setCandidate(String candidate) {
        this.candidate = candidate;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getInterviewMode() {
        return interviewMode;
    }

    public void setInterviewMode(String interviewMode) {
        this.interviewMode = interviewMode;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getInterviewType() {
        return interviewType;
    }

    public void setInterviewType(String interviewType) {
        this.interviewType = interviewType;
    }

    public String getPanelMembers() {
        return panelMembers;
    }

    public void setPanelMembers(String panelMembers) {
        this.panelMembers = panelMembers;
    }

    public String getMeetingLink() {
        return meetingLink;
    }

    public void setMeetingLink(String meetingLink) {
        this.meetingLink = meetingLink;
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

    // Fetch job details from the job application
    public String getJobTitle() {
        return jobApplication != null ? jobApplication.getJob().getJobTitle() : null;
    }

    public String getJobLocation() {
        return jobApplication != null ? jobApplication.getJob().getJobLocation() : null;
    }

    // Fetch seeker details from the job application
    public String getSeekerName() {
        return jobApplication != null && jobApplication.getSeeker() != null ? jobApplication.getSeeker().getJsName() : null;
    }

    public String getSeekerContact() {
        return jobApplication != null && jobApplication.getSeeker() != null ? jobApplication.getSeeker().getJsContact() : null;
    }

    public String getSeekerEmail() {
        return jobApplication != null && jobApplication.getSeeker() != null ? jobApplication.getSeeker().getJsEmail() : null;
    }
}