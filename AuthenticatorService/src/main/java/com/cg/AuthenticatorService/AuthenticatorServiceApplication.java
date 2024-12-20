package com.cg.AuthenticatorService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableDiscoveryClient
@EntityScan(basePackages = "com.cg.sharedmodule.model")
@ComponentScan(basePackages = {"com.cg.AuthenticatorService", "com.cg.sharedmodule"})
public class AuthenticatorServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(AuthenticatorServiceApplication.class, args);
	}

}
