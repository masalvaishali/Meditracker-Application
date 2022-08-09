package com.meditracker.patient.record.model;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long recordId;
    Long patientId;
    String consultingDocName;
    String conditionCategory;
    String severity;
    LocalDate procedureDate;
    String procedureType;

    @ElementCollection
    List<String> files = new ArrayList<>();





}
