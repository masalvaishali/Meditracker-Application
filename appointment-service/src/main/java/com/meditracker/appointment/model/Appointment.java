package com.meditracker.appointment.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
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
