package com.jshimas.karmaapi.domain.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.UUID;

public record ActivityViewDTO(
        @NotNull @NotBlank UUID id,
        @NotNull @NotBlank String organizationId,
        @NotNull @NotBlank String organizationName,
        @NotNull @NotBlank String name,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
        @NotNull Instant startDate,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", timezone = "UTC")
        @NotNull Instant endDate,
        @NotNull @NotBlank String description,
        @NotNull @NotBlank String address,
        @NotNull Boolean isPublic,
        @NotNull Set<String> scopes,
        @NotNull Boolean resolved,
        @NotNull Integer volunteersNeeded,
        GeoPointDTO geoLocation,
        Set<FeedbackViewDTO> feedbacks,
        Set<ApplicationViewDTO> applications,
        Set<ParticipationViewDTO> participations,
        Set<UserViewDTO> volunteers,

        Timestamp createdAt,
        Timestamp updatedAt
) {

}
