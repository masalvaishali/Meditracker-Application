package com.meditracker.patient.record.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecordedCases {
    Integer severeRiskCases;
    Integer highRiskCases;
    Integer moderateRiskCases;
    Integer lowRiskCases;
    Integer normalCases;
}
