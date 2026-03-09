package com.example.demo.service;

import com.example.demo.model.PasswordEntry;
import com.example.demo.model.User;
import com.example.demo.repository.PasswordEntryRepo;
import com.example.demo.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PasswordEntryService {

    @Autowired
    private PasswordEntryRepo repo;

    @Autowired
    private UserRepo userRepo;

    public PasswordEntry save(PasswordEntry entry) {
        return repo.save(entry);
    }

    public List<PasswordEntry> getAll() {
        return repo.findAll();
    }

    public void deleteById(Long id) {
        repo.deleteById(id);
    }

    public PasswordEntry save(PasswordEntry entry, String username) {
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        entry.setUser(user); // sets FK
        return repo.save(entry);
    }
}
