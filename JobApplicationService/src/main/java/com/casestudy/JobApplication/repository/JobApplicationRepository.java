package com.casestudy.JobApplication.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.casestudy.JobApplication.model.JobApplication;
import com.casestudy.JobSeeker.model.Seeker;

@Repository
public interface JobApplicationRepository extends JpaRepository<JobApplication, Long> {
    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.employer.empId = :empId")
    List<JobApplication> findByEmpId(Long empId);

    @Query("SELECT ja FROM JobApplication ja WHERE ja.job.jobId = :jobId")
    List<JobApplication> findByJobId(Long jobId);

    @Query("SELECT s FROM Seeker s WHERE s.jsId IN (SELECT ja.seeker.jsId FROM JobApplication ja WHERE ja.job.jobId = :jobId)")
    List<Seeker> findSeekerByJobId(@Param("jobId") Long jobId);

    //	List<JobApplication> findApplicationByEmpId(Long empId);
//    @Query("SELECT s FROM Seeker s WHERE :skillset MEMBER OF s.jsSkills AND s.jsId IN (SELECT ja.seeker.jsId FROM JobApplication ja WHERE ja.job.jobId = :jobId)")
    @Query("SELECT s FROM Seeker s WHERE :skill MEMBER OF s.jsSkills")
    List<Seeker> findSeekerBySkillset(@Param("skill") String skill);
}