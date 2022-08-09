package com.meditracker.patient.record.serviceImpl;

import com.meditracker.patient.record.model.PatientRecord;
import com.meditracker.patient.record.repository.PatientRecordRepository;
import com.meditracker.patient.record.service.PatientRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientRecordServiceImpl implements PatientRecordService {

    @Autowired
    PatientRecordRepository patientRecordRepository;

    @Override
    public PatientRecord save(PatientRecord patientRecord) {
        return patientRecordRepository.save(patientRecord);
    }

    @Override
    public List<PatientRecord> findAll() {
        return patientRecordRepository.findAll();
    }

    @Override
    public List<PatientRecord> findByPatientId(Long patientId) {
        return patientRecordRepository.findByPatientId(patientId);
    }

    @Override
    public PatientRecord findByRecordId(Long recordId) {
        return patientRecordRepository.findByRecordId(recordId);
    }
}
