package com.cg.JobSeekerService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.cg.sharedmodule.model")
public class JobSeekerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobSeekerServiceApplication.class, args);
	}

}
