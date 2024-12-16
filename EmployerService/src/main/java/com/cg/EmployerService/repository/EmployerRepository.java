package com.cg.EmployerService.repository;

import com.cg.EmployerService.model.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
    Employer findByEmpId(Long empId);

    Employer findByEmpEmail(String username);
}