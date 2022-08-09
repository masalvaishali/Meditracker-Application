package com.meditracker.appointment.service;

import com.meditracker.appointment.model.ExpenseInsights;

public interface AppointmentExpenseInsightsService {
    ExpenseInsights getInsights(Long patientId);
}
