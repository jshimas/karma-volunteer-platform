package com.jshimas.karmaapi.services.impl;

import com.jshimas.karmaapi.domain.dto.OrganizationEditDTO;
import com.jshimas.karmaapi.domain.dto.OrganizationNoActivitiesDTO;
import com.jshimas.karmaapi.domain.dto.OrganizationViewDTO;
import com.jshimas.karmaapi.domain.exceptions.NotFoundException;
import com.jshimas.karmaapi.domain.exceptions.ForbiddenAccessException;
import com.jshimas.karmaapi.domain.mappers.OrganizationMapper;
import com.jshimas.karmaapi.entities.Organization;
import com.jshimas.karmaapi.repositories.OrganizationRepository;
import com.jshimas.karmaapi.services.AuthTokenService;
import com.jshimas.karmaapi.services.OrganizationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl implements OrganizationService {
    private final OrganizationRepository organizationRepository;
    private final OrganizationMapper organizationMapper;
    private final AuthTokenService tokenService;

    @Override
    public OrganizationNoActivitiesDTO create(OrganizationEditDTO organizationDTO) {
        Organization organization =
                organizationRepository.save(organizationMapper.toEntity(organizationDTO));

        return organizationMapper.toNoActivitiesDTO(organization);
    }

    @Override
    public OrganizationViewDTO findById(UUID id) {
        Organization organization = organizationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Organization.class, id));

        return organizationMapper.toDTO(organization);
    }

    @Override
    public Organization findEntityById(UUID id) {
        return organizationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Organization.class, id));
    }

    @Override
    public List<OrganizationNoActivitiesDTO> findAll() {
        return organizationRepository.findAll().stream()
                .map(organizationMapper::toNoActivitiesDTO)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteById(UUID id) {
        if (!organizationRepository.existsById(id)) {
            throw new NotFoundException(Organization.class, id);
        }
        organizationRepository.deleteById(id);
    }

    @Override
    public OrganizationViewDTO update(UUID id, OrganizationEditDTO organizationDTO, Jwt token) {
        Organization existingOrganization = organizationRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(Organization.class, id));

        boolean userIsOrganizer = existingOrganization.getOrganizers().stream()
                .anyMatch(organizer -> organizer.getUser().getId().equals(tokenService.extractId(token)));

        if (!userIsOrganizer) {
            throw new ForbiddenAccessException();
        }

        organizationMapper.updateEntityFromDTO(organizationDTO, existingOrganization);
        Organization updatedOrganization = organizationRepository.save(existingOrganization);

        return organizationMapper.toDTO(updatedOrganization);
    }
}
