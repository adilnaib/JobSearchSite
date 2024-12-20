package com.cg.AuthenticatorService.service;

import com.cg.AuthenticatorService.controller.UserController;
import com.cg.AuthenticatorService.exception.AuthenticatorException;
import com.cg.sharedmodule.model.Users;
import com.cg.AuthenticatorService.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {

    @InjectMocks
    private UserController userController;

    @Mock
    private UserService userService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testRegisterFailure() throws AuthenticatorException {
        Users user = new Users();
        user.setUsername("testuser");
        user.setPassword("password");

        // Using doThrow for methods that return void
        doThrow(new AuthenticatorException("Registration Error")).when(userService).register(user);

        assertThrows(AuthenticatorException.class, () -> userController.register(user));  // Expect exception
    }

    @Test
    void testLoginSuccess() throws AuthenticatorException {
        Users user = new Users();
        user.setUsername("testuser");
        user.setPassword("password");

        when(userService.verify(user)).thenReturn("token");

        ResponseEntity<String> response = userController.login(user);

        assertEquals(HttpStatus.OK, response.getStatusCode());  // Assert response status
        assertEquals("User logged in successfully", response.getBody());
    }

    @Test
    void testLoginFailure() throws AuthenticatorException {
        Users user = new Users();
        user.setUsername("testuser");
        user.setPassword("password");

        when(userService.verify(user)).thenThrow(new AuthenticatorException("Invalid Credentials"));

        assertThrows(AuthenticatorException.class, () -> userController.login(user));  // Expect exception
    }
}
