package com.meditracker.patient.record.controller;

import com.meditracker.patient.record.model.InsightsModel;
import com.meditracker.patient.record.model.PatientRecord;
import com.meditracker.patient.record.model.RecordedCases;
import com.meditracker.patient.record.service.PatientInsightService;
import com.meditracker.patient.record.service.PatientRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("record/insights/patient")
public class PatientInsightsController {

    @Autowired
    PatientInsightService patientInsightService;

    @GetMapping("/{patientId}")
    public ResponseEntity<?> getInsights(@PathVariable("patientId") Long patientId){
        InsightsModel model = patientInsightService.getInsights(patientId);
        if(model == null)
            return new ResponseEntity<>("No patient records found for id "+patientId,HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(model,HttpStatus.OK);
    }

}
