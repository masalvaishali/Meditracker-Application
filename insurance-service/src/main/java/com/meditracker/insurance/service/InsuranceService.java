package com.meditracker.insurance.service;

import com.meditracker.insurance.model.Insurance;

public interface InsuranceService {
    Insurance save(Insurance insurance);

    Insurance findByPatientId(Long patientId);
}
