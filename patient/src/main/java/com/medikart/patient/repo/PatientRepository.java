package com.medikart.patient.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.medikart.patient.entity.Patient;

public interface PatientRepository extends JpaRepository<Patient, Long>
{

    Patient getByEmailId(String emailId);
}
