package org.capgemini.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ElementCollection;
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
    private double jsContact;
    private String jsEmail;
    private String username;
    private String password;
    @ElementCollection
    private List<String> jsSkills; 

}
