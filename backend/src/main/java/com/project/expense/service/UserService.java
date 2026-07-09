package com.project.expense.service;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.expense.dto.ChangePasswordRequest;
import com.project.expense.dto.ProfileRequest;
import com.project.expense.dto.ProfileResponse;
import com.project.expense.entity.User;
import com.project.expense.repository.UserRepository;

import lombok.RequiredArgsConstructor;



@Service
@RequiredArgsConstructor
public class UserService {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    private User getCurrentUser() {

        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public ProfileResponse getProfile() {

        User user = getCurrentUser();

        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    public ProfileResponse updateProfile(ProfileRequest request) {

        User user = getCurrentUser();

        user.setName(request.getName());
        user.setEmail(request.getEmail());

        userRepository.save(user);

        return new ProfileResponse(
                user.getId(),
                user.getName(),
                user.getEmail()
        );
    }

    public void changePassword(ChangePasswordRequest request) {

    User user = getCurrentUser();

    // Verify current password
    if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
        throw new RuntimeException("Current password is incorrect");
    }

    // Check new password and confirm password
    if (!request.getNewPassword().equals(request.getConfirmPassword())) {
        throw new RuntimeException("Passwords do not match");
    }

    // Update password
    user.setPassword(passwordEncoder.encode(request.getNewPassword()));

    userRepository.save(user);
}
}