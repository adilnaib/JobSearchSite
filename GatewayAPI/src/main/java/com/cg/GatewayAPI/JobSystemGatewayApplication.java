package com.cg.GatewayAPI;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class JobSystemGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobSystemGatewayApplication.class, args);
	}

}
