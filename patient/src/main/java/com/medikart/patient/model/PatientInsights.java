package com.medikart.patient.model;

import com.medikart.patient.entity.Recommendation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientInsights {
    RecordsInsights recordsInsights;
    List<Recommendation> dietExerciseRecommendations=new ArrayList<>();
    ExpenseInsights expenseInsights;
}
