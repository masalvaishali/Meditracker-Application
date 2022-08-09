package com.meditracker.patient.record.service;

import com.meditracker.patient.record.model.InsightsModel;

public interface PatientInsightService {
    InsightsModel getInsights(Long patientId);
}
