package com.meditracker.patient.record.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsightsModel {
    Map<String,Integer> recordedCases = new HashMap<>();
    Map<String,Integer> casesByConditions = new HashMap<>();
    Set<String> riskyConditionsIn=new HashSet<>();
}
