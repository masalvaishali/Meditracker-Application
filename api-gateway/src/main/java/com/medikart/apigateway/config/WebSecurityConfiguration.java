package com.medikart.apigateway.config;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

import static java.util.Collections.singletonList;

@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final AuthenticationFilter authenticationFilter;

    public WebSecurityConfiguration(AuthenticationFilter authenticationFilter) {
        this.authenticationFilter = authenticationFilter;
    }

    @Override
    public void configure(final HttpSecurity http) throws Exception {
        http.cors().configurationSource(corsConfigurationSource());

        http
                .cors().configurationSource(corsConfigurationSource())
                .and()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
                .anonymous()
        .and()
                .exceptionHandling().authenticationEntryPoint((request, response, ex) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
        .and()
                .addFilterAfter(authenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                    .antMatchers("/auth/**").permitAll()
                    .antMatchers("/patient/signup").permitAll()
                    .antMatchers("/doctor/signup").permitAll()
                    .antMatchers("/patient/**").hasRole("PATIENT")
                    .antMatchers("/doctor/**").hasRole("DOCTOR")
                    .antMatchers("/medicare/**").permitAll()
                    .antMatchers("/feedback/**").permitAll()
                    .antMatchers("/recommendation/**").permitAll();
                    //.anyRequest().hasRole("USER");
    }

    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        List<String> allowOrigins = Arrays.asList("*");
        configuration.setAllowedOrigins(allowOrigins);
        configuration.setAllowedMethods(singletonList("*"));
        configuration.setAllowedHeaders(singletonList("*"));
        //in case authentication is enabled this flag MUST be set, otherwise CORS requests will fail
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


}

