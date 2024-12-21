package com.cg.AuthenticatorService;

import com.cg.AuthenticatorService.controller.UserController;
import com.cg.AuthenticatorService.exception.AuthenticatorException;
import com.cg.AuthenticatorService.repository.UserRepository;
import com.cg.AuthenticatorService.service.JWTService;
import com.cg.AuthenticatorService.service.UserService;
import com.cg.sharedmodule.model.Users;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.when;

@SpringBootTest
class AuthenticatorServiceApplicationTests {

	@InjectMocks
	private JWTService jwtService;

	@InjectMocks
	private UserController userController;

	@Mock
	private UserService userService;

	@Mock
	private UserRepository userRepository;

	@Mock
	private AuthenticationManager authenticationManager;

	@Mock
	private Authentication authentication;

	@Test
	void contextLoads() {
	}

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

//	@Test
//	void testValidateToken() {
//		String username = "testuser";
//		String token = jwtService.generateToken(username);
//
//		boolean isValid = jwtService.validateToken(token, mock(UserDetails.class));
//
//		assertTrue(isValid);  // Validate that the token is valid
//	}
//
//	@Test
//	void testValidateTokenExpired() {
//		String username = "testuser";
//		String token = jwtService.generateToken(username);
//
//		// Simulate expired token (for testing)
//		String expiredToken = token + "expired";
//
//		boolean isValid = jwtService.validateToken(expiredToken, mock(UserDetails.class));
//
//		assertFalse(isValid);  // Validate that the token is expired
//	}

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

		ResponseEntity<Object> response = userController.login(user);

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

	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
	}

//	@Test
//	void testRegisterSuccess() throws AuthenticatorException {
//		Users user = new Users();
//		user.setUsername("testuser");
//		user.setPassword("password");
//
//		when(userRepository.findByUsername(user.getUsername())).thenReturn(null);  // No existing user
//
//		userService.register(user);
//
//		verify(userRepository, times(1)).save(user);  // Ensure the user is saved
//	}
//
//	@Test
//	void testRegisterUserExists() {
//		Users user = new Users();
//		user.setUsername("testuser");
//		user.setPassword("password");
//
//		when(userRepository.findByUsername(user.getUsername())).thenReturn(new Users());  // Simulate existing user
//
//		assertThrows(AuthenticatorException.class, () -> userService.register(user));  // Expect exception
//	}
//
//	@Test
//	void testVerifySuccess() throws AuthenticatorException {
//		Users user = new Users();
//		user.setUsername("testuser");
//		user.setPassword("password");
//
//		when(authenticationManager.authenticate(any())).thenReturn(authentication);
//		when(jwtService.generateToken(user.getUsername())).thenReturn("token");
//
//		String token = userService.verify(user);
//
//		assertNotNull(token);  // Ensure token is returned
//		verify(authenticationManager, times(1)).authenticate(any());
//	}
//
//	@Test
//	void testVerifyInvalidCredentials() {
//		Users user = new Users();
//		user.setUsername("testuser");
//		user.setPassword("password");
//
//		when(authenticationManager.authenticate(any())).thenThrow(new RuntimeException("Invalid credentials"));
//
//		assertThrows(AuthenticatorException.class, () -> userService.verify(user));  // Expect exception
//	}
//
//	@Test
//	void testCheckUser() {
//		String username = "testuser";
//		when(userRepository.findByUsername(username)).thenReturn(new Users());
//
//		assertTrue(userService.checkUser(username));  // User exists
//
//		when(userRepository.findByUsername(username)).thenReturn(null);
//		assertFalse(userService.checkUser(username));  // User does not exist
//	}

}
