package com.doctor.doctorservice.controller;

import com.doctor.doctorservice.model.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@RestController
@RequestMapping("/doctor")
public class AppointmentController {

    private static final String BASE_PATH_URL="http://APPOINTMENT-SERVICE/appointment";

    @Autowired
    RestTemplate restTemplate;

    @GetMapping("/{doctorId}/appointment")
    public ResponseEntity<?> getDoctorAppointments(@PathVariable("doctorId") int doctorId)
    {
        List appointments = restTemplate.getForObject(BASE_PATH_URL+"/doctor/"+doctorId,List.class);
        return new ResponseEntity<List<Appointment>>(appointments, HttpStatus.OK);
    }

    @GetMapping("/{doctorId}/appointment/{appointmentId}")
    public ResponseEntity<?> getAppointmentById(@PathVariable("appointmentId") Long appointmentId, @PathVariable("doctorId") Long doctorId)
    {
        Appointment appointment = restTemplate.getForObject(BASE_PATH_URL+"/"+appointmentId,Appointment.class);
        return new ResponseEntity<Appointment>(appointment,HttpStatus.OK);
    }

    @PutMapping("/appointment/update")
    public ResponseEntity<?> updateAppointmentStatus(@RequestBody Appointment appointment)
    {
        try{
            ResponseEntity<Appointment> response = restTemplate.postForEntity(BASE_PATH_URL+"/update",appointment,Appointment.class);
            if(response.getStatusCode() == HttpStatus.ACCEPTED)
                return new ResponseEntity<>((response.getBody()), HttpStatus.ACCEPTED);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
