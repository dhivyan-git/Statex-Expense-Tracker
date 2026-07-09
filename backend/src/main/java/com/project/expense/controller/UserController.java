package com.project.expense.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.expense.dto.ChangePasswordRequest;
import com.project.expense.dto.ProfileRequest;
import com.project.expense.dto.ProfileResponse;
import com.project.expense.service.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ProfileResponse getProfile() {
        return userService.getProfile();
    }

    @PutMapping
    public ProfileResponse updateProfile(
            @RequestBody ProfileRequest request) {

        return userService.updateProfile(request);
    }
    
    @PutMapping("/change-password")
public ResponseEntity<String> changePassword(
        @RequestBody ChangePasswordRequest request
) {

    userService.changePassword(request);

    return ResponseEntity.ok("Password changed successfully");
}

}