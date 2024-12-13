package org.capgemini.controller;

import org.capgemini.model.Employer;
import org.capgemini.model.Seeker;
import org.capgemini.services.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/register")
public class RegistrationController {

    @Autowired
    RegistrationService registrationService;

    @PostMapping("/employer")
    public Employer saveEmployer(@RequestBody Employer employer) {
        return registrationService.saveEmployer(employer);
    }

    @PostMapping("/seeker")
    public Seeker saveSeeker(@RequestBody Seeker seeker) {
        return registrationService.saveSeeker(seeker);
    }
}

