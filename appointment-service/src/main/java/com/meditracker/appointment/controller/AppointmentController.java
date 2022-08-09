package com.meditracker.appointment.controller;


import com.meditracker.appointment.model.Appointment;
import com.meditracker.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getPatientAppointments(@PathVariable("patientId") Long patientId){
        List<Appointment> appointments= appointmentService.findByPatientId (patientId);
        if(appointments.size()==0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(appointments,HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<?> getDoctorAppointments(@PathVariable("doctorId") Long doctorId){
        List<Appointment> appointments= appointmentService.findByDoctorId (doctorId);
        if(appointments.size()==0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(appointments,HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Appointment appointment){
        Appointment bookedAppointment=appointmentService.save(appointment);
        if(bookedAppointment==null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(bookedAppointment,HttpStatus.ACCEPTED);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updateAppointmentStatus(@RequestBody Appointment appointment){
        Appointment bookedAppointment=appointmentService.save(appointment);
        if(appointment==null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(bookedAppointment,HttpStatus.ACCEPTED);
    }

    @GetMapping("/{appointmentId}")
    public ResponseEntity<?> getAppointmentById(@PathVariable("appointmentId") Long appointmentId){
        Appointment appointment=appointmentService.findByAppointmentId(appointmentId);
        if(appointment==null)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(appointment,HttpStatus.OK);
    }
}
