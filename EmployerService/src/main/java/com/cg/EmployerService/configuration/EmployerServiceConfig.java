package com.cg.EmployerService.configuration;

import com.cg.sharedmodule.configuration.SharedModuleConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Configuration
@Import(SharedModuleConfig.class)
public class EmployerServiceConfig {
}