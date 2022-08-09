package com.doctor.doctorservice.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DoctorAuthDTO {
    String authId;
    String username;
    String password;
    String role;

    public DoctorAuthDTO(String emailId, String password, String role) {
        this.username=emailId;
        this.password=password;
        this.role=role;
    }
}
