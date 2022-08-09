package com.medikart.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientAuthDTO {
    String authId;
    String username;
    String password;
    String role;

    public PatientAuthDTO(String emailId, String password, String role) {
        this.username=emailId;
        this.password=password;
        this.role=role;
    }
}
