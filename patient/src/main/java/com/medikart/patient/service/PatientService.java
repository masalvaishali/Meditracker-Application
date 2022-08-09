package com.medikart.patient.service;


import com.medikart.patient.entity.Patient;

public interface PatientService 
{
	public Patient savePatient(Patient patient);
	
	public Patient getPatient(Long id);
	
	public String deletePatient(Long id);
	
	public Patient updatePatient(Patient patient);

    Patient getPatientByEmailId(String emailId);
}
