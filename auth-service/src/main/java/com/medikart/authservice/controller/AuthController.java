package com.medikart.authservice.controller;

import com.medikart.authservice.dto.ErrorDto;
import com.medikart.authservice.dto.JwtParseRequestDto;
import com.medikart.authservice.dto.JwtParseResponseDto;
import com.medikart.authservice.model.AuthUser;
import com.medikart.authservice.service.JwtService;
import com.medikart.authservice.service.UserAuthService;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class AuthController {

    final JwtService jwtService;

    @Autowired
    UserAuthService userAuthService;

    public AuthController(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @RequestMapping(value = "/jwt/parse", method = RequestMethod.POST)
    public ResponseEntity<?> getSomeSensitiveData(@RequestBody JwtParseRequestDto requestDto) {
        try {
            JwtParseResponseDto jwtParseResponseDto = jwtService.parseJwt(requestDto.getToken());
            return new ResponseEntity<>(jwtParseResponseDto, HttpStatus.OK);

        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(new ErrorDto(ex.getLocalizedMessage()), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> addNewUser(@RequestBody AuthUser user){
            AuthUser newUser= userAuthService.createUser(user);
            if(newUser!=null) {
                return ResponseEntity.ok().body(newUser);
            }
        return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    }
}
