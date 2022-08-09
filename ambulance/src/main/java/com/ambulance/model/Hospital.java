package com.ambulance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Hospital
{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    int hospitalId;
    String name;
    String contactNumber;
    String address;
    String city;
    String state;
    String zipcode;
    int numberOfAmbulance;

    Coordinates coordinates;

    @ElementCollection
    List<String> departments = new ArrayList<>();

    @ElementCollection
    List<String> ambulanceNos = new ArrayList<>();
}
