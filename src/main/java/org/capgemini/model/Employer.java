package org.capgemini.model;


public class Employer {
    private String empOrg;
    private String empAddress;
    private double empContact;
    private String empEmail;
    private String userName;
    private String empName;

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
        return userName;
    }

    public void setUsername(String userName) {
        this.userName = userName;
    }

    public String getEmpname() {
        return empName;
    }

    public void setEmpname(String empName) {
        this.empName = empName;
    }

    public void setEmpOrg(String empOrg) {
        this.empOrg = empOrg;
    }
}
