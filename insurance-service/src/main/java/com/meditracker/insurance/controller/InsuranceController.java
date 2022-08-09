package com.meditracker.insurance.controller;

import com.meditracker.insurance.dto.PatientDTO;
import com.meditracker.insurance.model.FileUpload;
import com.meditracker.insurance.model.Insurance;
import com.meditracker.insurance.service.EmailService;
import com.meditracker.insurance.service.FileUploadService;
import com.meditracker.insurance.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.ws.rs.QueryParam;

@RestController
@RequestMapping("/insurance")
public class InsuranceController {

    @Autowired
    EmailService emailService;

    @Autowired
    InsuranceService insuranceService;

    @Autowired
    FileUploadService fileUploadService;

    @PostMapping(value="" )
    public ResponseEntity<?> addPatientRecord(@RequestPart ("insurance") Insurance insurance,
                                              @RequestPart (value = "file", required = false) MultipartFile multipartFile){
        try {
            Insurance addedInsurance = insuranceService.save(insurance);
            System.err.println(addedInsurance.getInsuranceId());
            if(addedInsurance==null)
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            if(multipartFile!=null) {
                    fileUploadService.saveFile(multipartFile, addedInsurance.getInsuranceId());
            }
            return new ResponseEntity<>("Successfully added insurance",HttpStatus.CREATED);
        }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping("/downloadRecord/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileId){
        FileUpload file=fileUploadService.findByFileId(fileId);
        if(file!=null)
            return new ResponseEntity<>(file,HttpStatus.OK);
        return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(file.getFileType()))
                    .header(HttpHeaders.CONTENT_DISPOSITION,"attachment:file="+file.getFileName())
                    .body(new ByteArrayResource(file.getFileContent()));
        //return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?> getInsurance(@PathVariable("patientId") Long patientId){
        Insurance insurance = insuranceService.findByPatientId(patientId);
        if(insurance==null)
            return new ResponseEntity<>("No insurance found for the user",HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(insurance, HttpStatus.OK);
    }

    @PostMapping("/sendEmail")
    public ResponseEntity<?> sendEmailWithAttachment(@RequestBody PatientDTO patientDTO, @RequestParam("condition") String condition){
        Insurance insurance = insuranceService.findByPatientId(patientDTO.getPatientId());
        if(insurance == null)
            return new ResponseEntity<>("No insurance found for the patient",HttpStatus.NOT_FOUND);
        FileUpload file = fileUploadService.findByFileId(insurance.getInsuranceDocId());

        String body = emailService.makeBody(patientDTO,condition.toLowerCase());
        String subject = emailService.makeSubject(patientDTO);
        try {
            if (body != null && subject != null)
                if(file!=null)
                    emailService.sendEmailAttachment(insurance.getInsuranceProviderEmail(),patientDTO.getEmailId(),
                        subject, body, file.getFileName(), new ByteArrayResource(file.getFileContent()));
                else  emailService.sendEmail(insurance.getInsuranceProviderEmail(), patientDTO.getEmailId(),
                        subject,body);
            return new ResponseEntity<>("Mail sent...",HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>("Could not send email.", HttpStatus.BAD_REQUEST);
        }
    }
}
