package com.doctor.doctorservice.controller;

import com.doctor.doctorservice.dto.DoctorMedicareDTO;
import com.doctor.doctorservice.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.doctor.doctorservice.model.Medicare;
import com.doctor.doctorservice.service.MedicareService;

import java.util.List;


@RestController
@RequestMapping("/medicare")
public class MedicareController 
{
	@Autowired
	MedicareService medicareService;

	@Autowired
	DoctorService doctorService;

	@GetMapping("")
	public ResponseEntity<?> getMedicare(){
		List<Medicare> medicareList = medicareService.findAll();
		if(medicareList.isEmpty())
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		return new ResponseEntity<>(medicareList,HttpStatus.OK);
	}
	
	@PostMapping("")
	public ResponseEntity<?> saveMedicare(@RequestBody Medicare medicare)
	{
		medicareService.saveMedicare(medicare);
		return new ResponseEntity<String>("Medicare service inserted successfully!",HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> getMedicareById(@PathVariable int id)
	{
		
		Medicare medicare = medicareService.getMedicare(id);
		return new ResponseEntity<Medicare>(medicare,HttpStatus.OK);
	}


	@GetMapping("/{medicareServiceId}/doctors")
	public ResponseEntity<?> getListOfDoctors(@PathVariable("medicareServiceId") int id)
	{
		DoctorMedicareDTO doctorMedicareDto = doctorService.getListOfDoctors(id);
		return new ResponseEntity<DoctorMedicareDTO>(doctorMedicareDto,HttpStatus.OK);
	}

	@PutMapping("/update")
	public ResponseEntity<?> updateMedicare(@RequestBody Medicare medicare)
	{
		Medicare medi = medicareService.updateMedicare(medicare);
		return new ResponseEntity<Medicare>(medi,HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteMedicare(@PathVariable int id)
	{
		String response = medicareService.deleteMedicare(id);
		return new ResponseEntity<String>(response,HttpStatus.OK);
	}
}
