package com.jshimas.karmaapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
    @NotNull @NotBlank private String firstName;
    @NotNull @NotBlank private String lastName;
    @NotNull @NotBlank @Email @Column(unique = true) private String email;
    @NotNull @ManyToOne @JoinColumn(name = "role_id") private UserRole role;
    @NotNull @ManyToOne @JoinColumn(name = "account_type_id") private AccountType accountType;
    private String imageUrl;
    @Size(min = 6, message = "Password must be at least 6 characters long")
    private String password;
    @OneToMany(mappedBy = "user") private List<Feedback> feedbacks;

    @CreationTimestamp private Timestamp createdAt;
    @UpdateTimestamp private Timestamp updatedAt;

    public String getRole() {
        return role.getRole();
    }
}
