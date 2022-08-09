package com.medikart.patient.controller;

import com.medikart.patient.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/patient")
public class PatientAppointmentController {

    private static final String BASE_PATH_URL="http://APPOINTMENT-SERVICE/appointment";

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/{patientId}/appointment")
    public ResponseEntity<?> getAppointmentsByPatientId(@PathVariable("patientId") Long patientId){
        try {
            ResponseEntity<Appointment[]> response = restTemplate.getForEntity(BASE_PATH_URL + "/patient/" + patientId, Appointment[].class);
            if (response.getStatusCode() == HttpStatus.OK)
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @PostMapping("/appointment/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment){
        try{
            ResponseEntity<Appointment> response = restTemplate.postForEntity(BASE_PATH_URL+"/book",appointment,Appointment.class);
            if(response.getStatusCode() == HttpStatus.ACCEPTED)
                return new ResponseEntity<>((response.getBody()), HttpStatus.ACCEPTED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }


    @GetMapping("/{patientId}/appointment/{appointmentId}")
    public ResponseEntity<?> getAppointmentsByPatientId(@PathVariable("patientId") Long patientId, @PathVariable("appointmentId") Long appointmentId){
        try {
            ResponseEntity<Appointment> response = restTemplate.getForEntity(BASE_PATH_URL + "/" + appointmentId, Appointment.class);
            if (response.getStatusCode() == HttpStatus.OK)
                if (response.getBody().getPatientId().equals(patientId))
                    return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
                else
                    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
