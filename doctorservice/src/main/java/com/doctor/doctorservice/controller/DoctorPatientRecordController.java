package com.doctor.doctorservice.controller;

import com.doctor.doctorservice.dto.FileDTO;
import com.doctor.doctorservice.dto.PatientRecordDTO;
import com.doctor.doctorservice.service.DoctorService;
import com.doctor.doctorservice.util.MultipartInputStreamFileResource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/doctor")
public class DoctorPatientRecordController {

    private static final String BASE_PATH_URL="http://PATIENT-RECORDS-SERVICE/record";
    @Autowired
    RestTemplate restTemplate;

    @Autowired
    DoctorService doctorService;

    @GetMapping("/{doctorId}/patient/{patientId}/record")
    public ResponseEntity<?> getPatientRecordsById(@PathVariable("doctorId") int doctorId,@PathVariable("patientId") Long patientId){
        try {
            ResponseEntity<PatientRecordDTO[]> response = restTemplate.getForEntity(BASE_PATH_URL + "/patient/" + patientId, PatientRecordDTO[].class);
            if (response.getStatusCode() == HttpStatus.OK)
                return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping("/patient-record/downloadRecord/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable("fileId") String fileId){
        FileDTO file=restTemplate.getForObject(BASE_PATH_URL+"/downloadRecord/"+fileId,FileDTO.class);
        if(file!=null)
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getFileType()))
                    .header(com.google.common.net.HttpHeaders.CONTENT_DISPOSITION,"attachment:file="+file.getFileName())
                    .body(new ByteArrayResource(file.getFileContent()));
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/record")
    public ResponseEntity<?> addPatientRecord(@RequestPart("patientRecord") PatientRecordDTO patientRecord,
                                              @RequestPart(value = "files", required = false) MultipartFile[] multipartFiles) throws IOException {
        LinkedMultiValueMap<String, Object> multipartRequest = new LinkedMultiValueMap<>();
        String response;
        HttpStatus httpStatus = HttpStatus.CREATED;
        try {

            HttpHeaders requestHeaders = new HttpHeaders();
            requestHeaders.setContentType(MediaType.MULTIPART_FORM_DATA);//Main request's headers

            if (multipartFiles != null) {
                for (MultipartFile file : multipartFiles) {
                    if (!file.isEmpty()) {
                        multipartRequest.add("files", new MultipartInputStreamFileResource(file.getInputStream(), file.getOriginalFilename()));
                    }
                }
            }


            HttpHeaders requestHeadersJSON = new HttpHeaders();
            requestHeadersJSON.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<PatientRecordDTO> requestEntityJSON = new HttpEntity<>(patientRecord, requestHeadersJSON);

            multipartRequest.set("patientRecord", requestEntityJSON);

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
}
