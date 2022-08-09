package com.meditracker.insurance.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Insurance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long insuranceId;
    @Column(unique = true)
    Long patientId;
    String insuranceNumber;
    String insuranceProvider;
    String insuranceProviderEmail;
    String insuranceDocId;
}
