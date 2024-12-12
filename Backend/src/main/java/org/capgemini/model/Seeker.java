package org.capgemini.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Seeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jsId;
    private String jsName;
    private String jsAddress;
    private String jsContact;
    private String jsEmail;
    private String username;
    private String password;
    @ElementCollection
    private List<String> jsSkills;
    @OneToMany
    private List<Job> favouriteJobs;


}
