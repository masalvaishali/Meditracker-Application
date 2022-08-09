package com.meditracker.appointment.serviceImpl;

import com.meditracker.appointment.model.Appointment;
import com.meditracker.appointment.model.ExpenseInsights;
import com.meditracker.appointment.service.AppointmentExpenseInsightsService;
import com.meditracker.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AppointmentExpenseInsightsServiceImpl implements AppointmentExpenseInsightsService {

    @Autowired
    AppointmentService appointmentService;

    @Override
    public ExpenseInsights getInsights(Long patientId) {

        List<Appointment> appointments = appointmentService.findByPatientId(patientId);
        if(appointments==null)
            return null;
        ExpenseInsights expenseInsights=new ExpenseInsights();
        Set<String> medicareServices = appointments.stream().map(appointment -> appointment.getMedicareService()).collect(Collectors.toSet());
        HashMap<String, Integer> expenseMap=new HashMap<>();
        for(String medicareService: medicareServices){
            int expense = appointments.stream().filter(appointment -> appointment.getMedicareService().equalsIgnoreCase(medicareService)).map(appointment -> appointment.getConsultationFee()).reduce((curr,next)-> curr+next).get();
            expenseMap.put(medicareService,expense);
        }
        expenseInsights.setExpenseByMedicareService(expenseMap);
        return expenseInsights;
    }
}
