package org.capgemini.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId;
    private String empOrg;
    private String empAddress;
    private String empContact;
    private String empEmail;
    private String userName;
    private String empName;

    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Job> jobs;

 
    public Long getEmpId() {
        return empId;
    }

    public void setEmpId(Long empId) {
        this.empId = empId;
    }

    public String getEmpOrg() {
        return empOrg;
    }

    public void setEmpOrg(String empOrg) {
        this.empOrg = empOrg;
    }

    public String getEmpAddress() {
        return empAddress;
    }

    public void setEmpAddress(String empAddress) {
        this.empAddress = empAddress;
    }

    public String getEmpContact() {
        return empContact;
    }

    public void setEmpContact(String empContact) {
        this.empContact = empContact;
    }

    public String getEmpEmail() {
        return empEmail;
    }

    public void setEmpEmail(String empEmail) {
        this.empEmail = empEmail;
    }

    public String getUsername() {
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getEmpName() {
        return empName;
    }

    public void setEmpName(String empName) {
        this.empName = empName;
    }

    public List<Job> getJobs() {
        return jobs;
    }

    public void setJobs(List<Job> jobs) {
        this.jobs = jobs;
    }
}
