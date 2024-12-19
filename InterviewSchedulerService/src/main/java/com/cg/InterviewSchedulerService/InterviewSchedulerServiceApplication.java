package com.cg.InterviewSchedulerService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = {"com.cg.InterviewSchedulerService.model", "com.cg.sharedmodule.model"})
public class InterviewSchedulerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewSchedulerServiceApplication.class, args);
	}

}
