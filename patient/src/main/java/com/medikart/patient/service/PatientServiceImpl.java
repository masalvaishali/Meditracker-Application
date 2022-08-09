package com.medikart.patient.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.medikart.patient.entity.Patient;
import com.medikart.patient.repo.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService
{
	@Autowired
	PatientRepository patientRepo;

	
	//insert
	public Patient savePatient(Patient patient)
	{
		return patientRepo.save(patient);
	}
	
	//get
	public Patient getPatient(Long id)
	{
		return patientRepo.findById(id).orElse(null);
	}
	
	//delete
	public String deletePatient(Long id)
	{
		patientRepo.deleteById(id);
		return "Patient removed successfully !";
	}
	
	//update
	public Patient updatePatient(Patient patient)
	{
		Patient existingPatient = patientRepo.findById(patient.getPatientId()).orElse(null);
		existingPatient.setPatientId(patient.getPatientId());
		existingPatient.setFirstName(patient.getFirstName());
		existingPatient.setLastName(patient.getLastName());
		existingPatient.setEmailId(patient.getEmailId());
		existingPatient.setPassword(patient.getPassword());
		existingPatient.setContactNumber(patient.getContactNumber());
		existingPatient.setAltContactNumber(patient.getAltContactNumber());
		existingPatient.setSecurityQuestion(patient.getSecurityQuestion());
		existingPatient.setSecurityAnswer(patient.getSecurityAnswer());
		existingPatient.setDateOfBirth(patient.getDateOfBirth());
		existingPatient.setGender(patient.getGender());
		existingPatient.setAddress1(patient.getAddress1());
		existingPatient.setAddress2(patient.getAddress2());
		existingPatient.setCity(patient.getCity());
		existingPatient.setZipcode(patient.getZipcode());		
		return patientRepo.save(existingPatient);
	}

	@Override
	public Patient getPatientByEmailId(String emailId) {
		return patientRepo.getByEmailId(emailId);
	}

}
