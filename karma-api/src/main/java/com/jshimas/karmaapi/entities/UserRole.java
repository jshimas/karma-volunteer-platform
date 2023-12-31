package com.jshimas.karmaapi.entities;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "user_roles")
public class UserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "role", nullable = false)
    private String role;

    public static final String ADMIN = "ADMIN";
    public static final String VOLUNTEER = "VOLUNTEER";
    public static final String UNVERIFIED_ORGANIZER = "UNVERIFIED_ORGANIZER";
    public static final String ORGANIZER = "ORGANIZER";
}