package org.capgemini.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
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
    private String jobCompanyEmail;
    private String jobStatus;
    @ManyToOne
    @JoinColumn(name = "emp_id")
    private Employer employer;
}
