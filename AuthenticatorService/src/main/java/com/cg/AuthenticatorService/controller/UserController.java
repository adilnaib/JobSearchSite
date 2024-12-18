package com.cg.AuthenticatorService.controller;

import com.cg.AuthenticatorService.exception.AuthenticatorException;
import com.cg.AuthenticatorService.model.Users;
import com.cg.AuthenticatorService.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserService service;


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody Users user) throws AuthenticatorException {
        service.register(user);
        return ResponseEntity.ok("User registered successfully");

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user) throws AuthenticatorException {
        service.verify(user);
        return ResponseEntity.ok("User logged in successfully");
    }
}
