package com.doctor.doctorservice.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Appointment
{
    Long appointmentId;
    Long patientId;
    Long doctorId;
    String patientName;

    String doctorName;
    String medicareService;
    Integer consultationFee;

    LocalDate appointmentDate;
    String status;
    Boolean isFeedbackProvided;
    Integer timeSlotId;
}
