package com.medikart.patient.controller;

import com.medikart.patient.dto.PatientDTO;
import com.medikart.patient.entity.Patient;
import com.medikart.patient.service.PatientService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/patient")
public class PatientHospitalAmbulanceController {

    private static final String BASE_PATH_URL="http://AMBULANCE-SERVICE/hospital";

    @Autowired
    PatientService patientService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    RestTemplate restTemplate;

    @GetMapping(value="{patientId}/hospital", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getHospitalsByCity(@PathVariable("patientId") Long patientId){
        Patient patient = patientService.getPatient(patientId);
        if(patient == null)
            return new ResponseEntity<>("No Patient found with id "+patientId, HttpStatus.NOT_FOUND);
        String city = patient.getCity();
        if(city!=null){
           // try{
                ResponseEntity<String> response = restTemplate.getForEntity(BASE_PATH_URL + "/city/" + city, String.class);
                if (response.getStatusCode() == HttpStatus.OK)
                    return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
           // }catch(Exception ignore){}
        }
        return new ResponseEntity<>("Could not find hospitals nearby",HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "{patientId}/hospital/{hospitalId}/bookAmbulance", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBooking(@PathVariable("patientId") Long patientId, @PathVariable("hospitalId") Long hospitalId){
        Patient patient = patientService.getPatient(patientId);
        if(patient == null)
            return new ResponseEntity<>("No patient found",HttpStatus.NOT_FOUND);
        PatientDTO patientDTO = modelMapper.map(patient, PatientDTO.class);
        try{
            ResponseEntity<?> response = restTemplate.postForEntity(BASE_PATH_URL + "/"+ hospitalId +"/book", patientDTO, String.class);
            if(response.getStatusCode() == HttpStatus.OK)
                return new ResponseEntity<>(response.getBody(),HttpStatus.OK);
        }catch(Exception ignore){}
        return new ResponseEntity<>("Could not book ambulance",HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PostMapping("/hospital/{hospitalId}/ambulance/{ambulanceNo}/cancelBooking")
    public ResponseEntity<?> cancelBooking(@PathVariable("hospitalId") int hospitalId, @PathVariable("ambulanceNo") String ambulanceNo){
        ResponseEntity<String> response = restTemplate.postForEntity(BASE_PATH_URL + "/"+hospitalId+"/cancelbooking/ambulance/"+ambulanceNo,null, String.class);
        if (response.getStatusCode() == HttpStatus.OK)
            return new ResponseEntity<>("Cancelled booking", HttpStatus.OK);
        return new ResponseEntity<>("Could not cancel booking",HttpStatus.NOT_ACCEPTABLE);
    }
}
