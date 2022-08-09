package com.medikart.patient.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientDTO {
    Long patientId;
    String firstName;
    String lastName;
    String emailId;
    String contactNumber;
    String address1;
    String address2;
    String city;
    String state;
    String zipcode;
    String dateOfBirth;
    String gender;
}
