package com.insurance.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.insurance.entity.User;
import com.insurance.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void register(User user) {
        userRepository.save(user);
    }
    public User login(User loginRequest) {

        User user = (User) userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        return user;
    }

}

