package com.cg.InterviewSchedulerService.repository;

import com.cg.InterviewSchedulerService.model.InterviewScheduler;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InterviewSchedulerRepository extends JpaRepository<InterviewScheduler, Long> {
}
