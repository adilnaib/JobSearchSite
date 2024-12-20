package com.cg.AuthenticatorService.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JWTServiceTest {

    @InjectMocks
    private JWTService jwtService;

    @Test
    void testGenerateToken() {
        String username = "testuser";

        String token = jwtService.generateToken(username);

        assertNotNull(token);  // Ensure a token is returned
        assertTrue(token.startsWith("eyJhbGciOiJIUzI1NiJ9"));  // Check that the token starts with "eyJhbGci"
    }

    @Test
    void testExtractUserName() {
        String username = "testuser";
        String token = jwtService.generateToken(username);

        String extractedUsername = jwtService.extractUserName(token);

        assertEquals(username, extractedUsername);  // Ensure the username is correctly extracted
    }

    @Test
    void testValidateToken() {
        String username = "testuser";
        String token = jwtService.generateToken(username);

        boolean isValid = jwtService.validateToken(token, mock(UserDetails.class));

        assertTrue(isValid);  // Validate that the token is valid
    }

    @Test
    void testValidateTokenExpired() {
        String username = "testuser";
        String token = jwtService.generateToken(username);

        // Simulate expired token (for testing)
        String expiredToken = token + "expired";

        boolean isValid = jwtService.validateToken(expiredToken, mock(UserDetails.class));

        assertFalse(isValid);  // Validate that the token is expired
    }
}
