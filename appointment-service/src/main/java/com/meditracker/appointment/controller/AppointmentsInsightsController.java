package com.meditracker.appointment.controller;

import com.meditracker.appointment.model.ExpenseInsights;
import com.meditracker.appointment.service.AppointmentExpenseInsightsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("appointment/expense/patient")
public class AppointmentsInsightsController {

    @Autowired
    AppointmentExpenseInsightsService appointmentExpenseInsightsService;

    @GetMapping("/{patientId}")
    public ResponseEntity<?> getExpenseForPatient(@PathVariable("patientId") Long patientId){
        ExpenseInsights expenseInsights=appointmentExpenseInsightsService.getInsights(patientId);
        if(expenseInsights==null)
            return new ResponseEntity<>("No Insights found for patient with id "+patientId, HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(expenseInsights,HttpStatus.OK);
    }

}
