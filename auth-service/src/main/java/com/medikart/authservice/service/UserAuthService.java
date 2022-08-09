package com.medikart.authservice.service;


import com.medikart.authservice.config.CustomUserDetails;
import com.medikart.authservice.model.AuthUser;
import com.medikart.authservice.repository.AuthUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class UserAuthService implements UserDetailsService {
    @Autowired
    private AuthUserRepository authUserRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AuthUser user = authUserRepository.getByUsername(username);
        if(user!=null){
            CustomUserDetails customUserDetails=new CustomUserDetails(user);
            return customUserDetails;
        }
        else if(username.equals("Admin")) {
            SimpleGrantedAuthority simpleGrantedAuthority= new SimpleGrantedAuthority("PATIENT");
            return new User("Admin", "password", Collections.singleton(simpleGrantedAuthority));
        }
        else{
            throw new UsernameNotFoundException("User Not Found");
        }
    }

    public AuthUser createUser(AuthUser user) {
        return authUserRepository.save(user);
    }
}
