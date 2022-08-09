package com.medikart.patient.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Insurance {

    Long patientId;
    String insuranceNumber;
    String insuranceProvider;
    String insuranceProviderEmail;
    String insuranceDocId;
}
