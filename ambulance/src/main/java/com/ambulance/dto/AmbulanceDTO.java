package com.ambulance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AmbulanceDTO {
    String ambulanceNo;
    String driverName;
    String driverContact;
}
