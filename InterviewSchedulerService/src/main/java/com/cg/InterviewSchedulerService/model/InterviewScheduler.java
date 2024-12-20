package com.cg.InterviewSchedulerService.model;

import java.time.LocalDate;
import java.util.List;

import com.cg.sharedmodule.model.JobApplication;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "interview_scheduler")
public class InterviewScheduler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long interviewId;

    @ManyToOne
    @JoinColumn(name = "application_id",referencedColumnName = "application_id")
    private JobApplication jobApplication;

    private LocalDate interviewDate;
    private String interviewTime;
    private String interviewLocation;
    private String interviewStatus;  // e.g., "Scheduled", "Completed", "Cancelled"
    
    // Interview Type (Online or Offline)
    private String interviewType;  // "Online" or "Offline"
    
    // List of panel members (can be just names or full details)
    @ElementCollection
    private List<String> panelMembers;  // Names or details of the panel members
    
    // Instructions for the interview
    private String instructions;  // Instructions or guidelines for the interview

    // Getters and Setters
    public Long getInterviewId() {
        return interviewId;
    }

    public void setInterviewId(Long interviewId) {
        this.interviewId = interviewId;
    }

    public JobApplication getJobApplication() {
        return jobApplication;
    }

    public void setJobApplication(JobApplication jobApplication) {
        this.jobApplication = jobApplication;
    }

    public LocalDate getInterviewDate() {
        return interviewDate;
    }

    public void setInterviewDate(LocalDate interviewDate) {
        this.interviewDate = interviewDate;
    }

    public String getInterviewTime() {
        return interviewTime;
    }

    public void setInterviewTime(String interviewTime) {
        this.interviewTime = interviewTime;
    }

    public String getInterviewLocation() {
        return interviewLocation;
    }

    public void setInterviewLocation(String interviewLocation) {
        this.interviewLocation = interviewLocation;
    }

    public String getInterviewStatus() {
        return interviewStatus;
    }

    public void setInterviewStatus(String interviewStatus) {
        this.interviewStatus = interviewStatus;
    }

    public String getInterviewType() {
        return interviewType;
    }

    public void setInterviewType(String interviewType) {
        this.interviewType = interviewType;
    }

    public List<String> getPanelMembers() {
        return panelMembers;
    }

    public void setPanelMembers(List<String> panelMembers) {
        this.panelMembers = panelMembers;
    }

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
}