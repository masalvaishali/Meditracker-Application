package com.medikart.patient.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
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
