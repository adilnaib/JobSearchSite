package com.cg.sharedmodule.repository;

import com.cg.sharedmodule.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByEmployer_EmpId(Long empId);

    Optional<Job> findByJobId(Long jobId);

    List<Job> findByJobLocation(String jobLocation);

    List<Job> findByJobTitle(String jobTitle);

    List<Job> findByExperienceInYears(int experienceInYears);

    List<Job> findByCompanyName(String companyName);

    @Query("SELECT j FROM Job j WHERE :skill MEMBER OF j.requiredSkills")
    List<Job> findByRequiredSkills(@Param("skill") String skill);
}