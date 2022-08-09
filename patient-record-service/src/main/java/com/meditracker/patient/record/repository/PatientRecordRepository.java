package com.meditracker.patient.record.repository;

import com.meditracker.patient.record.model.PatientRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PatientRecordRepository extends JpaRepository<PatientRecord, Long> {


    PatientRecord getByRecordId(Long recordId);

    List<PatientRecord> findByPatientId(Long patientId);

    PatientRecord findByRecordId(Long recordId);
}
