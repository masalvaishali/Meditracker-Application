package com.medikart.patient.controller;

import com.medikart.patient.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/patient")
public class DoctorAvailabilityController {

    private static final String BASE_PATH_URL="http://APPOINTMENT-SERVICE/appointment/doctor";

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/doctor/{doctorId}/getAppointmentAvailability")
    public ResponseEntity<?> getDocAvailability(@PathVariable("doctorId") int doctorId){
        try {
            ResponseEntity<Appointment[]> response = restTemplate.getForEntity(BASE_PATH_URL +"/"+ doctorId, Appointment[].class);
            if (response.getStatusCode() == HttpStatus.OK)
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
