package com.medikart.authservice.config;
import com.medikart.authservice.service.UserAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.http.HttpServletResponse;

@EnableWebSecurity
public class WebSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final String signingKey;

    @Autowired
    private UserAuthService userAuthService;

    @Autowired
    public WebSecurityConfiguration(@Value("${security.jwt.signing-key}") String signingKey) {
        this.signingKey = signingKey;
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userAuthService);
    }

    @Override
    protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
                .exceptionHandling()
                .authenticationEntryPoint((request, response, ex) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED))
        .and()
                .addFilterAfter(new JwtUsernamePasswordAuthenticationFilter(authenticationManager(), signingKey), UsernamePasswordAuthenticationFilter.class)
                .authorizeRequests()
                .antMatchers("/login").permitAll()
                .antMatchers("/jwt/parse").permitAll()
                .antMatchers("/signup").permitAll()
                .antMatchers("/swagger-ui/**", "/v3/api-docs/**").permitAll()
                .antMatchers("/swagger-ui.html").permitAll()
                .anyRequest().authenticated();
    }
    @Bean
    public PasswordEncoder passwordEncoder(){
        return NoOpPasswordEncoder.getInstance();
    }


    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}