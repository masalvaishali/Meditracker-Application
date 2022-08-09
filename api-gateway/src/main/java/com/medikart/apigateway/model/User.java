package com.medikart.apigateway.model;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class User {
    String username;
    List<String> authorities;
}
