package com.meditracker.insurance.repository;

import com.meditracker.insurance.model.Insurance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InsuranceRepo extends JpaRepository<Insurance,Long> {
    Insurance findByPatientId(Long patientId);

    Insurance findByInsuranceId(Long insuranceId);
}
