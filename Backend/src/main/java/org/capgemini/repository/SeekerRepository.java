package org.capgemini.repository;

import org.capgemini.model.Seeker;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SeekerRepository extends JpaRepository<Seeker,Integer> {

    Seeker findByJsEmail(String username);
}
