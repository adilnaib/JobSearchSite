package com.cg.EmployerService.repository;

import com.cg.EmployerService.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByEmployer_EmpId(Long empId);

    Job findByJobId(Long jobId);

    List<Job> findByJobLocation(String jobLocation);

    List<Job> findByJobTitle(String jobTitle);

    List<Job> findByExperienceInYears(int experienceInYears);

    List<Job> findByCompanyName(String companyName);

    @Query("SELECT j FROM Job j WHERE :skill MEMBER OF j.requiredSkills")
    List<Job> findByRequiredSkills(@Param("skill") String skill);
}