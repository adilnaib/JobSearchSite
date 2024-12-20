package com.cg.sharedmodule.model;


import jakarta.persistence.*;
import com.cg.sharedmodule.model.Job;

import java.util.List;

@Entity
public class Seeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jsId;
    private String jsName;
    private String jsAddress;
    private String jsContact;
    private String jsEmail;
    @Column(nullable = false)
    private String username;
    @ElementCollection
    private List<String> jsSkills;
    @ManyToMany
    @JoinTable(
            name = "seeker_favourite_jobs",
            joinColumns = @JoinColumn(name = "seeker_js_id"),
            inverseJoinColumns = @JoinColumn(name = "job_id")
    )
    private List<Job> favouriteJobs;

    public Long getJsId() {
        return jsId;
    }

    public void setJsId(Long jsId) {
        this.jsId = jsId;
    }

    public String getJsName() {
        return jsName;
    }

    public void setJsName(String jsName) {
        this.jsName = jsName;
    }

    public String getJsAddress() {
        return jsAddress;
    }

    public void setJsAddress(String jsAddress) {
        this.jsAddress = jsAddress;
    }

    public String getJsContact() {
        return jsContact;
    }

    public void setJsContact(String jsContact) {
        this.jsContact = jsContact;
    }

    public String getJsEmail() {
        return jsEmail;
    }

    public void setJsEmail(String jsEmail) {
        this.jsEmail = jsEmail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public List<String> getJsSkills() {
        return jsSkills;
    }

    public void setJsSkills(List<String> jsSkills) {
        this.jsSkills = jsSkills;
    }

    public List<Job> getFavouriteJobs() {
        return favouriteJobs;
    }

    public void setFavouriteJobs(List<Job> favouriteJobs) {
        this.favouriteJobs = favouriteJobs;
    }
}