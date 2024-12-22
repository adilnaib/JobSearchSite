package com.cg.AuthenticatorService.service;

import com.cg.AuthenticatorService.exception.AuthenticatorException;
import com.cg.sharedmodule.model.Users;
import com.cg.AuthenticatorService.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private JWTService jwtService;

    @Autowired
    AuthenticationManager authManager;

    @Autowired
    private UserRepository repo;


    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    public void register(Users user) throws AuthenticatorException {
        if (checkUser(user.getUsername())) {
            throw new AuthenticatorException("Registration Error: Username already exists.");
        }
        user.setPassword(encoder.encode(user.getPassword()));
        repo.save(user);
    }

    public String verify(Users user) throws AuthenticatorException {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        if (authentication.isAuthenticated()) {
            return jwtService.generateToken(user.getUsername());
        } else {
            throw new AuthenticatorException("Invalid Credentials: Username or Password is incorrect.");
        }
    }

    public boolean checkUser(String username) {
        return repo.findByUsername(username) != null;
    }

    public Users findByUsername(String username) {
        return repo.findByUsername(username);
    }
}
