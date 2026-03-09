package com.example.demo.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Table(name = "password_entries")
public class PasswordEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long entryId;

    private String website;
    private String username;
    private String password;

    // FOREIGN KEY
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
