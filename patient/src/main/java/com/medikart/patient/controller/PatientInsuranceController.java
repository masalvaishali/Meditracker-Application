package com.medikart.patient.controller;

import com.medikart.patient.dto.PatientDTO;
import com.medikart.patient.entity.Patient;
import com.medikart.patient.model.Appointment;
import com.medikart.patient.model.Insurance;
import com.medikart.patient.model.PatientRecord;
import com.medikart.patient.service.PatientService;
import com.medikart.patient.util.MultipartInputStreamFileResource;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.QueryParam;
import java.io.IOException;

@RestController
@RequestMapping("/patient")
public class PatientInsuranceController {

    private final static String BASE_PATH_URL="http://INSURANCE-SERVICE/insurance";

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    PatientService patientService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value="/{patientId}/insurance",produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPatientInsuranceDetails(@PathVariable("patientId") Long patientId){
        try {
            ResponseEntity<String> response = restTemplate.getForEntity(BASE_PATH_URL + "/patient/" + patientId, String.class);
            if (response.getStatusCode() == HttpStatus.OK)
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);

    }


    @PostMapping("/insurance")
    public ResponseEntity<?> addPatientInsurance(@RequestPart("insurance") Insurance insurance,
                                              @RequestPart(value = "file", required = false) MultipartFile multipartFile) throws IOException {
        LinkedMultiValueMap<String, Object> multipartRequest = new LinkedMultiValueMap<>();
        String response;
        HttpStatus httpStatus = HttpStatus.CREATED;
        try {

            HttpHeaders requestHeaders = new HttpHeaders();
            requestHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);//Main request's headers

            if (multipartFile != null)
                    if (!multipartFile.isEmpty())
                        multipartRequest.add("file",
                                new MultipartInputStreamFileResource(multipartFile.getInputStream(),
                                        multipartFile.getOriginalFilename()));


            HttpHeaders requestHeadersJSON = new HttpHeaders();
            requestHeadersJSON.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<Insurance> requestEntityJSON = new HttpEntity<>(insurance, requestHeadersJSON);

            multipartRequest.set("insurance", requestEntityJSON);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(multipartRequest, requestHeaders);//final request

            response = restTemplate.postForObject(BASE_PATH_URL, requestEntity, String.class);

        }catch (HttpStatusCodeException e) {
            httpStatus = HttpStatus.valueOf(e.getStatusCode().value());
            response = e.getResponseBodyAsString();
        } catch (Exception e) {
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
            response = e.getMessage();
        }

        return new ResponseEntity<>(response, httpStatus);
    }

    @PostMapping("{patientId}/insurance/sendEmail")
    public ResponseEntity<?> sendEmail(@PathVariable("patientId") Long patientId, @RequestParam("condition") String condition){
        Patient patient = patientService.getPatient(patientId);
        if(patient == null)
            return new ResponseEntity<>("Patient does not exist with id "+patientId,HttpStatus.NOT_FOUND);
        PatientDTO patientDTO = modelMapper.map(patient,PatientDTO.class);
        try{
            ResponseEntity<String> response = restTemplate.postForEntity(BASE_PATH_URL+"/sendEmail?condition="+condition,patientDTO,String.class);
            if(response.getStatusCode() == HttpStatus.OK)
                return new ResponseEntity<>((response.getBody()), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
