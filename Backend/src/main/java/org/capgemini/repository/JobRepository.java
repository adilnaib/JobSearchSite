package org.capgemini.repository;

import org.capgemini.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

	List<Job> findByEmployer_EmpId(Long empId);
  
}
