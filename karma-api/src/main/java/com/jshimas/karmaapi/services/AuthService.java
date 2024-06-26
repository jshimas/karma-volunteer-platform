package com.jshimas.karmaapi.services;

import com.jshimas.karmaapi.domain.dto.*;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.UUID;

public interface AuthService {
    AccessTokenResponse login(AuthRequest authRequest);
    void logout(Jwt currentUserJwt);

}
