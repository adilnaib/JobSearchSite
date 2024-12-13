package org.capgemini.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long empId;
    private String empOrg;
    private String empAddress;
    private double empContact;
    private String empEmail;
    private String userName;
    private String empName;
    @OneToMany(mappedBy = "employer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Job> jobs;
    private String password;

}
