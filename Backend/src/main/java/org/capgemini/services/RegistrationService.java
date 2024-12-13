package org.capgemini.services;

import org.capgemini.model.Employer;
import org.capgemini.model.Seeker;
import org.capgemini.repository.EmployerRepository;
import org.capgemini.repository.JobSeekerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class RegistrationService {

    @Autowired
    EmployerRepository employerRepository;

    @Autowired
    JobSeekerRepository seekerRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(12);

    public Employer saveEmployer(Employer employer){
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        return employerRepository.save(employer);
    }

    public Seeker saveSeeker(Seeker seeker){
        seeker.setPassword(passwordEncoder.encode(seeker.getPassword()));
        return seekerRepository.save(seeker);
    }
}
