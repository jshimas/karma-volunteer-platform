package com.jshimas.karmaapi.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "organizations")
public class Organization {
    @Id @GeneratedValue(strategy = GenerationType.UUID) private UUID id;
    @NotNull @NotBlank private String name;
    @NotNull @Email private String email;
    @NotNull @NotBlank private String phone;
    @NotNull @ManyToOne @JoinColumn(name = "type_id") private OrganizationType type;
    private String mission;
    private String address;
    private String website;
    private String facebook;
    private String instagram;
    private String youtube;
    private String linkedin;
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL) private List<Event> events;
    @OneToMany(mappedBy = "organization", cascade = CascadeType.ALL) private List<Organizer> organizers;

    @CreationTimestamp private Timestamp createdAt;
    @UpdateTimestamp private Timestamp updatedAt;
}
