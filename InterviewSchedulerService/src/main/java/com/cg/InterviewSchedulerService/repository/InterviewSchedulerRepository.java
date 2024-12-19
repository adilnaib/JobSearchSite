package com.cg.InterviewSchedulerService.repository;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewSchedulerRepository extends JpaRepository<InterviewScheduler, Long> {
	   List<InterviewScheduler> findByJobApplicationJobEmployerEmpId(Long empId);

	    // Find interviews by job seeker's ID
	    List<InterviewScheduler> findByJobApplicationSeekerJsId(Long seekerId);
}
