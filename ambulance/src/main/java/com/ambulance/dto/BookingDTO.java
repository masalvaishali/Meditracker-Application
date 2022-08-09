package com.ambulance.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingDTO
{
    PatientDTO patient;
    HospitalDTO hospital;
    AmbulanceDTO ambulance;
}
