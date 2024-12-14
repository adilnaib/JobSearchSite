package com.casestudy.Employer.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.casestudy.Employer.model.Employer;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long> {
    Employer findByEmpId(Long empId);

    Employer findByEmpEmail(String username);
}
