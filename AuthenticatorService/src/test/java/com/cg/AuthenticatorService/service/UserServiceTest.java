package com.cg.AuthenticatorService.service;

import com.cg.AuthenticatorService.exception.AuthenticatorException;
import com.cg.sharedmodule.model.Users;
import com.cg.AuthenticatorService.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private JWTService jwtService;

    @Mock
    private Authentication authentication;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterSuccess() throws AuthenticatorException {
        Users user = new Users();
        user.setUsername("testuser");
        user.setPassword("password");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(null);  // No existing user

        userService.register(user);

        verify(userRepository, times(1)).save(user);  // Ensure the user is saved
    }

    @Test
    void testRegisterUserExists() {
        Users user = new Users();
        user.setUsername("testuser");
        user.setPassword("password");

        when(userRepository.findByUsername(user.getUsername())).thenReturn(new Users());  // Simulate existing user

        assertThrows(AuthenticatorException.class, () -> userService.register(user));  // Expect exception
    }

    @Test
    void testVerifySuccess() throws AuthenticatorException {
        Users user = new Users();
        user.setUsername("testuser");
        user.setPassword("password");

        when(authenticationManager.authenticate(any())).thenReturn(authentication);
        when(jwtService.generateToken(user.getUsername())).thenReturn("token");

        String token = userService.verify(user);

        assertNotNull(token);  // Ensure token is returned
        verify(authenticationManager, times(1)).authenticate(any());
    }

    @Test
    void testVerifyInvalidCredentials() {
        Users user = new Users();
        user.setUsername("testuser");
        user.setPassword("password");

        when(authenticationManager.authenticate(any())).thenThrow(new RuntimeException("Invalid credentials"));

        assertThrows(AuthenticatorException.class, () -> userService.verify(user));  // Expect exception
    }

    @Test
    void testCheckUser() {
        String username = "testuser";
        when(userRepository.findByUsername(username)).thenReturn(new Users());

        assertTrue(userService.checkUser(username));  // User exists

        when(userRepository.findByUsername(username)).thenReturn(null);
        assertFalse(userService.checkUser(username));  // User does not exist
    }
}
