package com.cg.EmployerService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
@EntityScan(basePackages = "com.cg.sharedmodule.model")
public class EmployerServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployerServiceApplication.class, args);
	}

}
