package com.jshimas.karmaapi.services;

import com.jshimas.karmaapi.domain.dto.EventEditDTO;
import com.jshimas.karmaapi.domain.dto.EventNoFeedbackDTO;
import com.jshimas.karmaapi.domain.dto.EventViewDTO;
import com.jshimas.karmaapi.entities.Event;

import java.util.List;
import java.util.UUID;

public interface EventService {
    EventViewDTO create(EventEditDTO eventDTO, UUID organizationId);
    EventViewDTO findById(UUID eventId, UUID organizationId);
    Event findEntity(UUID eventId, UUID organizationId);
    List<EventNoFeedbackDTO> findAllOrganizationEvents(UUID organizationId);
    void deleteById(UUID eventId, UUID organizationId);
    EventViewDTO update(UUID eventId, UUID organizationId, EventEditDTO eventDTO);
}
