package com.medikart.patient.controller;

import com.medikart.patient.dto.PatientAuthDTO;
import com.medikart.patient.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.medikart.patient.entity.Patient;
import com.medikart.patient.service.PatientService;
import org.springframework.web.client.RestTemplate;


@RestController
@RequestMapping("/patient")
public class PatientController
{
	@Autowired
	PatientService patientService;

	@Autowired
	RestTemplate restTemplate;
	
	@PostMapping("/signup")
	public ResponseEntity<?> savePatient(@RequestBody Patient patient)
	{
		if(patientService.getPatientByEmailId(patient.getEmailId())!=null)
			return new ResponseEntity<>("User already exists!",HttpStatus.CONFLICT);
		Patient addedPatient = patientService.savePatient(patient);
		PatientAuthDTO patientAuthDTO= new PatientAuthDTO(patient.getEmailId(),patient.getPassword(),"ROLE_PATIENT");
		if(addedPatient!=null) {
			try{
			ResponseEntity<PatientAuthDTO> response = restTemplate.postForEntity("http://AUTH-SERVICE/signup", patientAuthDTO, PatientAuthDTO.class);
			addedPatient.setAuthId(response.getBody().getAuthId());
			patientService.savePatient(addedPatient);
			return new ResponseEntity<String>("Signed-up Successfully",HttpStatus.CREATED);
			}catch (Exception e){
				patientService.deletePatient(addedPatient.getPatientId());
				return new ResponseEntity<>("Could not sign patient up",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<String>("Could not sign patient up",HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping("/getId")
	public ResponseEntity<?> getPatientIdByEmailId(@RequestParam("email") String emailId){
		Patient patient=patientService.getPatientByEmailId(emailId);
		if(patient!=null)
			return new ResponseEntity<>(patient.getPatientId(),HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getPatient(@PathVariable("id") Long id)
	{
		Patient patient = patientService.getPatient(id);
		if(patient!=null)
			return new ResponseEntity<Patient>(patient,HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updatePatient(@RequestBody Patient patient)
	{
		Patient exists=patientService.getPatient(patient.getPatientId());
		if(exists==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		String authId= exists.getAuthId();
		patient.setAuthId(authId);
		Patient p = patientService.updatePatient(patient);
		PatientAuthDTO patientAuthDTO= new PatientAuthDTO(patient.getAuthId(),patient.getEmailId(),patient.getPassword(),"ROLE_PATIENT");
		if(p!=null) {
			try{
				ResponseEntity<String> response = restTemplate.postForEntity("http://AUTH-SERVICE/signup", patientAuthDTO, String.class);
				return new ResponseEntity<String>("Updated successfully",HttpStatus.OK);
			}catch (Exception e){
				return new ResponseEntity<>("Could not update patient",HttpStatus.CONFLICT);
			}
		}
		return new ResponseEntity<String>("Could not update patient",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deletePatient(@PathVariable("id") Long id)
	{
		String response = patientService.deletePatient(id);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}
}
