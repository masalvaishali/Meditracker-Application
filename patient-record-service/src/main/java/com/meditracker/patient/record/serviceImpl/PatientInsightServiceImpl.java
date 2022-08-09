package com.meditracker.patient.record.serviceImpl;

import com.meditracker.patient.record.model.InsightsModel;
import com.meditracker.patient.record.model.PatientRecord;
import com.meditracker.patient.record.model.RecordedCases;
import com.meditracker.patient.record.service.PatientInsightService;
import com.meditracker.patient.record.service.PatientRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class PatientInsightServiceImpl implements PatientInsightService {

    @Autowired
    PatientRecordService patientRecordService;

    @Override
    public InsightsModel getInsights(Long patientId) {
        List<PatientRecord> patientRecords = patientRecordService.findByPatientId(patientId);
        if(patientRecords.size()==0){
            return null;
        }

        InsightsModel insightsModel = new InsightsModel();
//        insightsModel.setRecordedCases(new RecordedCases());
        try {
            insightsModel = getSeverityInsightsAndConditions(insightsModel, patientRecords);
        }catch(Exception ignore){}
        try {
            insightsModel = getNoOfCasesByConditions(insightsModel, patientRecords);
        }catch (Exception ignore){}
        Map<String, Integer> severeAndHighCaseType =new HashMap<>();
        //for(PatientRecord patientRecord:severeRiskCases)
        return insightsModel;
    }

    public InsightsModel getSeverityInsightsAndConditions(InsightsModel insightsModel, List<PatientRecord> patientRecords){
        String[] severities = {"severe","high","moderate","low","normal"};
        String[] severitiesForRecommendations={"severe","high"};
        Map<String,Integer> severitiesMap = new HashMap<>();
        Set<String> riskyConditions = new HashSet<>();
        for(String severity:severities){
            Set<String> riskCasesConditions= patientRecords.stream().filter(patientRecord -> patientRecord.getSeverity().equalsIgnoreCase(severity))
                    .map(patientRecord -> patientRecord.getConditionCategory()).collect(Collectors.toSet());
            severitiesMap.put(severity,riskCasesConditions.size());
            if(Arrays.asList(severitiesForRecommendations).contains(severity)){
                riskyConditions.addAll(riskCasesConditions);
            }
        }
        insightsModel.setRecordedCases(severitiesMap);
        insightsModel.setRiskyConditionsIn(riskyConditions);
        System.err.println(riskyConditions);
        return insightsModel;
    }

    public InsightsModel getNoOfCasesByConditions(InsightsModel insightsModel, List<PatientRecord> patientRecords){
        Set<String> conditionCategories = patientRecords.stream().map(patientRecord -> patientRecord.getConditionCategory()).collect(Collectors.toSet());
        Map<String,Integer> conditionsMap = new HashMap<>();
        for(String condition:conditionCategories){
            int count= patientRecords.stream().filter(patientRecord -> patientRecord.getConditionCategory().equals(condition)).collect(Collectors.toList()).size();
            conditionsMap.put(condition,count);
        }
        insightsModel.setCasesByConditions(conditionsMap);
        return insightsModel;
    }
}
