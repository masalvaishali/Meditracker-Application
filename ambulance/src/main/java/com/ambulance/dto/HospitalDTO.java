package com.ambulance.dto;

import com.ambulance.model.Coordinates;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class HospitalDTO {
    int hospitalId;
    String name;
    String contactNumber;
    String address;
    String city;
    String state;
    String zipcode;
    int numberOfAmbulance;
    Coordinates coordinates;
    List<String> departments = new ArrayList<>();
}
