package com.doctor.doctorservice.controller;

import com.doctor.doctorservice.dto.DoctorAuthDTO;
import com.doctor.doctorservice.dto.DoctorDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.doctor.doctorservice.model.Doctor;
import com.doctor.doctorservice.service.DoctorService;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.HashMap;

@RestController
@RequestMapping("/doctor")
public class DoctorController 
{
	@Autowired
	DoctorService doctorService;

	@Autowired
	RestTemplate restTemplate;
	
	@PostMapping("/signup")
	public ResponseEntity<?> saveDoctor(@RequestBody Doctor doctor)
	{
		if(doctorService.getByEmailId(doctor.getEmailId())!=null)
			return new ResponseEntity<>("User already exists!",HttpStatus.CONFLICT);
		HashMap<String, BigDecimal> rating=new HashMap<>();
		rating.put("cumulativeRating",BigDecimal.valueOf(5));
		doctor.setRating(rating);
		Doctor addedDoctor = doctorService.saveDoctor(doctor);
		DoctorAuthDTO doctorAuthDTO = new DoctorAuthDTO(doctor.getEmailId(),doctor.getPassword(),"ROLE_DOCTOR");
		if(addedDoctor!=null){
			try{
				ResponseEntity<DoctorAuthDTO> response = restTemplate.postForEntity("http://AUTH-SERVICE/signup", doctorAuthDTO, DoctorAuthDTO.class);
				addedDoctor.setAuthId(response.getBody().getAuthId());
				doctorService.saveDoctor(addedDoctor);
				return new ResponseEntity<String>("Signed-up Successfully",HttpStatus.OK);
			}catch (Exception e){
				doctorService.deleteDoctor(addedDoctor.getDoctorId());
				return new ResponseEntity<>("Could not sign doctor up",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<>("Could not sign doctor up",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	@GetMapping("/getId")
	public ResponseEntity<?> getPatientIdByEmailId(@RequestParam("email") String emailId){
		Doctor doctor=doctorService.getByEmailId(emailId);
		if(doctor!=null)
			return new ResponseEntity<>(doctor.getDoctorId(),HttpStatus.OK);
		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getDoctor(@PathVariable("id") int id)
	{
		Doctor doctor = doctorService.getDoctorAllFields(id);
		if(doctor == null)
			return new ResponseEntity<>("No doctor found with id: "+id,HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(doctor,HttpStatus.OK);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateDoctor(@RequestBody Doctor doctor)
	{
		DoctorDTO exists=doctorService.getDoctor(doctor.getDoctorId());
		if(exists==null)
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		String authId= doctorService.getAuthId(doctor.getDoctorId());
		doctor.setAuthId(authId);
		Doctor doc = doctorService.updateDoctor(doctor);
		DoctorAuthDTO doctorAuthDTO = new DoctorAuthDTO(doc.getAuthId(),doc.getEmailId(),doc.getPassword(),"ROLE_DOCTOR");
		if(doc!=null){
			try{
				ResponseEntity<String> response = restTemplate.postForEntity("http://AUTH-SERVICE/signup", doctorAuthDTO, String.class);
				return new ResponseEntity<String>("Updated Successfully",HttpStatus.OK);
			}catch (Exception e){
				return new ResponseEntity<>("Could not update doctor",HttpStatus.INTERNAL_SERVER_ERROR);
			}
		}
		return new ResponseEntity<>("Could not update doctor",HttpStatus.INTERNAL_SERVER_ERROR);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteDoctor(@PathVariable("id") int id)
	{
		String response = doctorService.deleteDoctor(id);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}


}
