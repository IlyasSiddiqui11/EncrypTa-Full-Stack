package com.example.demo.controller;

import com.example.demo.model.PasswordEntry;
import com.example.demo.service.PasswordEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(
        origins = "http://127.0.0.1:3000",
        allowedHeaders = "*",
        methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.OPTIONS},
        allowCredentials = "true"
)
@RequestMapping("/api/passwords")
public class PasswordEntryController {

    @Autowired
    private PasswordEntryService service;

    @GetMapping
    public List<PasswordEntry> getAllPasswords() {
        return service.getAll();
    }

    // SAVE (used when clicking submit)
    @PostMapping
    public PasswordEntry savePassword(@RequestBody PasswordEntry entry) {
        return service.save(entry);
    }

    // DELETE (used by delete button)
    @DeleteMapping("/{id}")
    public void deletePassword(@PathVariable Long entryId) {
        service.deleteById(entryId);
    }
}
