package com.cg.InterviewSchedulerService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@EntityScan(basePackages = {"com.cg.InterviewSchedulerService.model", "com.cg.sharedmodule.model"})
@ComponentScan(basePackages = {"com.cg.InterviewSchedulerService", "com.cg.sharedmodule"})
public class InterviewSchedulerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(InterviewSchedulerServiceApplication.class, args);
	}

}
