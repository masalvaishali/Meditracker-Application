package com.medikart.patient.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseInsights {
    Map<String, Integer> expenseByMedicareService=new HashMap<>();
}
