package com.jshimas.karmaapi.domain.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record FeedbackViewDTO(
        @NotNull @NotBlank UUID id,
        @NotNull @NotBlank UUID userId,
        @NotNull @NotBlank UUID eventId,
        @NotNull @NotBlank String comment
) {
}
