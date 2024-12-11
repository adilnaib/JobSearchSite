package org.capgemini.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ElementCollection;

import java.util.List;

@Entity
public class Seeker {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jsId;
    private String jsName;
    private String jsAddress;
    private double jsContact;
    private String jsEmail;
    @ElementCollection
    private List<String> jsSkills; 

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

    public double getJsContact() {
        return jsContact;
    }

    public void setJsContact(double jsContact) {
        this.jsContact = jsContact;
    }

    public String getJsEmail() {
        return jsEmail;
    }

    public void setJsEmail(String jsEmail) {
        this.jsEmail = jsEmail;
    }

    public List<String> getJsSkills() {
        return jsSkills;
    }

    public void setJsSkills(List<String> jsSkills) {
        this.jsSkills = jsSkills;
    }
}
