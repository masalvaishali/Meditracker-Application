package com.doctor.doctorservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRecordDTO {

    Long recordId;
    Long patientId;
    String consultingDocName;
    String conditionCategory;
    LocalDate procedureDate;
    String severity;
    String procedureType;
    List<String> files = new ArrayList<>();

}