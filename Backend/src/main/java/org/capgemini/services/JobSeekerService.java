package org.capgemini.services;

import org.capgemini.model.Job;
import org.capgemini.model.Seeker;
import org.capgemini.repository.JobRepository;
import org.capgemini.repository.JobSeekerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobSeekerService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobSeekerRepository jobSeekerRepository;

    public List<Job> searchJobsByLocation(String location) {
        return jobRepository.findByJobLocation(location);
    }

    public List<Job> searchJobsByTitle(String jobTitle) {
        return jobRepository.findByJobTitle(jobTitle);
    }

    public List<Job> searchJobsByExperienceInYears(int experienceInYears) {
        return jobRepository.findByExperienceInYears(experienceInYears);
    }

    public List<Job> searchJobsByCompanyName(String companyName) {
        return jobRepository.findByCompanyName(companyName);
    }

    public Seeker registerJobSeeker(Seeker seeker) {
        return jobSeekerRepository.save(seeker);
    }

    public List<Job> searchJobsBySkills(List<String> requiredSkills) {
        return requiredSkills.stream()
                .flatMap(skill -> jobRepository.findByRequiredSkills(skill).stream())
                .distinct()
                .collect(Collectors.toList());
    }
}
