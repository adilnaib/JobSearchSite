package com.casestudy.JobSeeker.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.casestudy.JobSeeker.model.Seeker;

@Repository
public interface JobSeekerRepository extends JpaRepository<Seeker, Long> {

    Seeker findByJsEmail(String username);
}
