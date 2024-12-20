package com.cg.AuthenticatorService.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackages = "com.cg.sharedmodule.model") // Ensure that JPA entities are scanned from the correct package
@EnableJpaRepositories(basePackages = "com.cg.AuthenticatorService.repository") // Ensure that repositories are scanned from the correct package
public class JpaConfig {
    // Configuration for scanning JPA entities and repositories
}