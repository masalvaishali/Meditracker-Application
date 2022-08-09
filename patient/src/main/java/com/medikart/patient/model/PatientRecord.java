package com.medikart.patient.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.ElementCollection;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRecord {

    Long recordId;
    Long patientId;
    String consultingDocName;
    String conditionCategory;
    LocalDate procedureDate;
    String severity;
    String procedureType;
    List<String> files = new ArrayList<>();

}