package com.cg.InterviewSchedulerService.repository;


import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InterviewSchedulerRepository extends JpaRepository<InterviewScheduler, Long> {

    // Retrieve interviews for a specific employer using employer ID
    @Query("SELECT i FROM InterviewScheduler i WHERE i.jobApplication.job.employer.empId = :employerId")
    List<InterviewScheduler> findByEmployerId(@Param("employerId") Long employerId);

    // Retrieve interviews for a specific seeker using seeker ID
    @Query("SELECT i FROM InterviewScheduler i WHERE i.jobApplication.seeker.jsId = :seekerId")
    List<InterviewScheduler> findBySeekerId(@Param("seekerId") Long seekerId);

    // Retrieve interviews for a specific job application ID
    @Query("SELECT i FROM InterviewScheduler i WHERE i.jobApplication.applicationId = :jobApplicationId")
    List<InterviewScheduler> findByJobApplicationId(@Param("jobApplicationId") Long jobApplicationId);
}