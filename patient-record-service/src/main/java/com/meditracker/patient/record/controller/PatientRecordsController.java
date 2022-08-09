package com.meditracker.patient.record.controller;

import com.google.common.net.HttpHeaders;
import com.meditracker.patient.record.model.FileUpload;
import com.meditracker.patient.record.model.PatientRecord;
import com.meditracker.patient.record.service.FileUploadService;
import com.meditracker.patient.record.service.PatientRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.amqp.RabbitTemplateConfigurer;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/record")
public class PatientRecordsController {

    @Autowired
    PatientRecordService patientRecordService;

    @Autowired
    FileUploadService fileUploadService;

    @GetMapping("")
    public ResponseEntity<?> getPatientRecord(){
        List<PatientRecord> patientRecords = patientRecordService.findAll();
        if(patientRecords.size()==0)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<>(patientRecords,HttpStatus.OK);
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<?>getPatientRecordByPatientId(@PathVariable("patientId") Long patientId){
        List<PatientRecord> patientRecords = patientRecordService.findByPatientId(patientId);
        if(patientRecords.size()==0)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(patientRecords,HttpStatus.OK);
    }
    @GetMapping("/{recordId}")
    public ResponseEntity<?>getPatientRecordByRecordId(@PathVariable("recordId") Long recordId){
        PatientRecord patientRecord = patientRecordService.findByRecordId(recordId);
        if(patientRecord!=null)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(patientRecord,HttpStatus.OK);
    }

    @PostMapping(value="" )
    public ResponseEntity<?> addPatientRecord(@RequestPart ("patientRecord") PatientRecord patientRecord,
                                              @RequestPart (value = "files", required = false) MultipartFile[] multipartFiles){
        try {
            //PatientRecord patientRecord=new PatientRecord();
            //patientRecord.setPatientId(patientId);
            PatientRecord addedRecord = patientRecordService.save(patientRecord);
            System.err.println(addedRecord.getRecordId());
            if(addedRecord==null)
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            if(multipartFiles!=null) {
                for (MultipartFile multipartFile : multipartFiles)
                    fileUploadService.saveFile(multipartFile, addedRecord.getRecordId());
            }
            return new ResponseEntity<>("Successfully added record",HttpStatus.CREATED);
            }
        catch(Exception e){
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @PostMapping("/{recordId}/upload")
    public ResponseEntity<?> uploadFile(@PathVariable("recordId") Long recordId, @RequestParam("files") MultipartFile[] multipartFiles){
        try {
            for (MultipartFile multipartFile : multipartFiles)
                fileUploadService.saveFile(multipartFile, recordId);
            return new ResponseEntity<>("Files uploaded successfully",HttpStatus.OK);
        }catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
        }
    }

    @GetMapping("/downloadRecord/{fileId}")
    public ResponseEntity<?> downloadFile(@PathVariable String fileId){
        FileUpload file=fileUploadService.findByFileId(fileId);
        if(file!=null)
            return new ResponseEntity<>(file,HttpStatus.OK);
//            return ResponseEntity.ok()
//                    .contentType(MediaType.parseMediaType(file.getFileType()))
//                    .header(HttpHeaders.CONTENT_DISPOSITION,"attachment:file="+file.getFileName())
//                    .body(new ByteArrayResource(file.getFileContent()));
    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
