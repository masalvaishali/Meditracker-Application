package com.doctor.doctorservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorDTO {
    int doctorId;
    String firstName;
    String lastName;
    String emailId;
    Map<String, BigDecimal> rating =new HashMap<>();
    String contactNumber;
    String altContactNumber;
    String address1;
    String address2;
    String city;
    String license;
    String state;
    int zipcode;
    String degree;
    String speciality;
    int workHours;
    String hospitalName;
    int medicareServiceId;
}
