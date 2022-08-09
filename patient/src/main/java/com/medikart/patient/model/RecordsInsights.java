package com.medikart.patient.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecordsInsights {
    Map<String,Integer> recordedCases = new HashMap<>();
    Map<String,Integer> casesByConditions = new HashMap<>();
    Set<String> riskyConditionsIn=new HashSet<>();
}
