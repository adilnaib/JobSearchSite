package org.capgemini.model;


public class Employer {
    private String empOrg;
    private String empAddress;
    private double empContact;
    private String empEmail;
    private String username;
    private String empname;

    public String getEmpOrg() {
        return empOrg;
    }

    public String getEmpAddress() {
        return empAddress;
    }

    public void setEmpAddress(String empAddress) {
        this.empAddress = empAddress;
    }

    public double getEmpContact() {
        return empContact;
    }

    public void setEmpContact(double empContact) {
        this.empContact = empContact;
    }

    public String getEmpEmail() {
        return empEmail;
    }

    public void setEmpEmail(String empEmail) {
        this.empEmail = empEmail;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmpname() {
        return empname;
    }

    public void setEmpname(String empname) {
        this.empname = empname;
    }

    public void setEmpOrg(String empOrg) {
        this.empOrg = empOrg;
    }
}
