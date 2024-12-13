package org.capgemini.services;


import org.capgemini.model.Employer;
import org.capgemini.model.Seeker;
import org.capgemini.repository.EmployerRepository;
import org.capgemini.repository.JobSeekerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;

@Service
public class UserInfoService implements UserDetailsService {

    @Autowired
    EmployerRepository employerRepository;

    @Autowired
    JobSeekerRepository seekerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employer employer=employerRepository.findByEmpEmail(username);
        if (employer!=null){
            System.out.println(employer.getEmpEmail());
            return new User(employer.getEmpEmail(), employer.getPassword(), Collections.singleton(new SimpleGrantedAuthority("Employer")));

        }


        Seeker seeker = seekerRepository.findByJsEmail(username);
        if (seeker != null) {
            return new User(seeker.getJsEmail(), seeker.getPassword(), Collections.singleton(new SimpleGrantedAuthority("Seeker")));
        }

        throw new UsernameNotFoundException("Email not found with username: " + username);
    }
}
