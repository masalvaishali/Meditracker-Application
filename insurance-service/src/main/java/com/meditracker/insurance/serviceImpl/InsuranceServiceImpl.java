package com.meditracker.insurance.serviceImpl;

import com.meditracker.insurance.model.Insurance;
import com.meditracker.insurance.repository.InsuranceRepo;
import com.meditracker.insurance.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InsuranceServiceImpl implements InsuranceService {

    @Autowired
    InsuranceRepo insuranceRepo;

    @Override
    public Insurance save(Insurance insurance) {
        return insuranceRepo.save(insurance);
    }

    @Override
    public Insurance findByPatientId(Long patientId) {
        return insuranceRepo.findByPatientId(patientId);
    }
}
