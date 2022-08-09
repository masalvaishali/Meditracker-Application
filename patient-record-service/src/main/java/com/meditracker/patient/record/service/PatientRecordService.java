package com.meditracker.patient.record.service;

import com.meditracker.patient.record.model.PatientRecord;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PatientRecordService {
    PatientRecord save(PatientRecord patientRecord);

    List<PatientRecord> findAll();

    List<PatientRecord> findByPatientId(Long patientId);

    PatientRecord findByRecordId(Long recordId);
}
