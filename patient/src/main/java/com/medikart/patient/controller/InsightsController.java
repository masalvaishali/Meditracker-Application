package com.medikart.patient.controller;

import com.medikart.patient.entity.Patient;
import com.medikart.patient.entity.Recommendation;
import com.medikart.patient.model.ExpenseInsights;
import com.medikart.patient.model.PatientInsights;
import com.medikart.patient.model.RecordsInsights;
import com.medikart.patient.service.PatientService;
import com.medikart.patient.service.RecommendationService;
import com.medikart.patient.service.RecommendationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/patient")
public class InsightsController {

    @Autowired
    PatientService patientService;

    @Autowired
    RecommendationService recommendationService;

    @Autowired
    RestTemplate restTemplate;

    private static final String EXPENSE_INSIGHTS_PATH_URL="http://APPOINTMENT-SERVICE/appointment/expense/patient";
    private static final String RECORDS_INSIGHTS_PATH_URL="http://PATIENT-RECORDS-SERVICE/record/insights/patient";

    @GetMapping("/{patientId}/insights")
    public ResponseEntity<?> getInsights(@PathVariable("patientId") Long patientId){
//        Patient patient = patientService.getPatient(patientId);
//        if(patient==null)
//            return new ResponseEntity<>("Patient Not Found", HttpStatus.NOT_FOUND);

        PatientInsights patientInsights = new PatientInsights();
        ExpenseInsights expenseInsights = new ExpenseInsights();
        RecordsInsights recordsInsights = new RecordsInsights();
        List<Recommendation> recommendations = new ArrayList<>();
        try {
            expenseInsights = restTemplate.getForObject(EXPENSE_INSIGHTS_PATH_URL + "/" + patientId, ExpenseInsights.class);
        }catch(Exception ignore){}
        try {
            recordsInsights = restTemplate.getForObject(RECORDS_INSIGHTS_PATH_URL + "/" + patientId, RecordsInsights.class);
            Set<String> conditions = recordsInsights.getRiskyConditionsIn();
            for(String condition:conditions){
                Recommendation recommendation=recommendationService.findByCondition(condition.toLowerCase());
                if(recommendation!=null) recommendations.add(recommendation);
            }
        }catch(Exception ignore){}
        patientInsights.setExpenseInsights(expenseInsights);
        patientInsights.setRecordsInsights(recordsInsights);
        patientInsights.setDietExerciseRecommendations(recommendations);
        return new ResponseEntity<>(patientInsights,HttpStatus.OK);
    }

}
