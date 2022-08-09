package com.medikart.authservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.medikart.authservice.dto.LoginDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.Instant;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;
import java.util.stream.Collectors;

public class JwtUsernamePasswordAuthenticationFilter extends AbstractAuthenticationProcessingFilter {

    public static final String HEADER = "Authorization";

    public static final String HEADER_VALUE_PREFIX = "Bearer";

    public static final String HEADER_VALUE_BASIC = "Basic";

    private final String signingKey;

    public JwtUsernamePasswordAuthenticationFilter(AuthenticationManager authenticationManager, String signingKey) {
        super(new AntPathRequestMatcher("/login", "POST"));
        setAuthenticationManager(authenticationManager);
        this.signingKey = signingKey;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException, IOException {

        //LoginDto loginDto = new ObjectMapper().readValue(request.getInputStream(), LoginDto.class);
        String encodedCredentials =request.getHeader(HEADER);
        if(encodedCredentials!=null)
            encodedCredentials = encodedCredentials.replace(HEADER_VALUE_BASIC+ " ", "");
        String decoded = new String(Base64.getDecoder().decode(encodedCredentials),"UTF-8");
        String credentials[]=decoded.split(":");
        return getAuthenticationManager().authenticate(new UsernamePasswordAuthenticationToken(
                credentials[0], //username
                credentials[1], //password
                Collections.emptyList()
        ));
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication auth) {
        Instant now = Instant.now();

        String token = Jwts.builder()
                .setSubject(auth.getName())
                .claim("authorities", auth.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
                .setIssuedAt(Date.from(now))
                .setExpiration(Date.from(now.plusSeconds(8 * 60 * 60))) // token expires in 8 hours
                .signWith(SignatureAlgorithm.HS256, signingKey.getBytes())
                .compact();
        response.addHeader("Access-Control-Expose-Headers", "Authorization");
        response.addHeader(HEADER, HEADER_VALUE_PREFIX + " " + token);
    }


}
