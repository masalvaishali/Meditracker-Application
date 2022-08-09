package com.medikart.authservice.repository;

import com.medikart.authservice.model.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser, String> {
    AuthUser getByUsername(String username);
}
