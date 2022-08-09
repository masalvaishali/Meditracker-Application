package com.ambulance.controller;

import com.ambulance.model.Ambulance;
import com.ambulance.service.AmbulanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ambulance")
public class AmbulanceController {
    @Autowired
    AmbulanceService ambulanceService;

    @PostMapping("/insert/hospital/{hospitalid}")
    public ResponseEntity<?> saveAmbulance(@RequestBody Ambulance ambulance,@PathVariable("hospitalid") int hospitalid) {
        Ambulance ambulance1 = ambulanceService.saveAmbulance(ambulance,hospitalid);
        return new ResponseEntity<>(ambulance1, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAmbulance(@PathVariable("id") String ambulanceNo) {
        Ambulance ambulance = ambulanceService.getAmbulance(ambulanceNo);
        return new ResponseEntity<>(ambulance, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateAmbulance(@RequestBody Ambulance ambulance) {
        Ambulance ambulance1 = ambulanceService.updateAmbulance(ambulance);
        return new ResponseEntity<>(ambulance1, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAmbulance(@PathVariable("id") String ambulanceNo) {
        String response = ambulanceService.deleteAmbulance(ambulanceNo);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}