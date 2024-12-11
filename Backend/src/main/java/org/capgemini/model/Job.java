package org.capgemini.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

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
    private String companyName;
    private String jobCompanyEmail;
    private String jobStatus;
    @ElementCollection
    private List<String> requiredSkills;
    @ManyToOne
    @JoinColumn(name = "emp_id")
    private Employer employer;

}
