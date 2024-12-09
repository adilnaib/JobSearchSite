package org.capgemini.model;

import java.util.List;

public class Seeker {
    private String jsName;
    private String jsAddress;
    private double jsContact;
    private String jsEmail;

    private List<String> jsSkills;

    public List<String> getJsSkills() {
        return jsSkills;
    }

    public void setJsSkills(List<String> jsSkills) {
        this.jsSkills = jsSkills;
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
}
