package com.jshimas.karmaapi.domain.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

public record OrganizationViewDTO(
        @NotNull @NotBlank UUID id,
        @NotNull @NotBlank String name,
        @NotNull @Email String email,
        @NotNull @NotBlank String phone,
        @NotNull @NotBlank String type,
        String mission,
        String address,
        String website,
        String facebook,
        String instagram,
        String youtube,
        String linkedin,
        String imageUrl,
        List<ActivityViewDTO> activities,

        Timestamp createdAt,
        Timestamp updatedAt
) {
}
