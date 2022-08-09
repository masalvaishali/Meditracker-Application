package com.doctor.doctorservice.controller;

import com.netflix.discovery.converters.Auto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/doctor")
public class DoctorTriggerInsuranceEmailController {
    private static final String BASE_PATH_URL="http://PATIENT-SERVICE/patient";
    //{patientId}/insurance/sendEmail

    @Autowired
    RestTemplate restTemplate;

    @PostMapping("/patient/{patientId}/insurance/sendEmail")
    public ResponseEntity<?> sendEmail(@PathVariable("patientId") Long patientId, @RequestParam("condition") String condition){
        try{
            ResponseEntity<String> response = restTemplate.postForEntity(BASE_PATH_URL+"/"+patientId+"/insurance/sendEmail?condition="+condition,null,String.class);
            if(response.getStatusCode() == HttpStatus.OK)
                return new ResponseEntity<>((response.getBody()), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

}
