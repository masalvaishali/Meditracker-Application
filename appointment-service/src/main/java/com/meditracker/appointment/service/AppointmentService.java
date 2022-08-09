package com.meditracker.appointment.service;

import com.meditracker.appointment.model.Appointment;

import java.util.List;

public interface AppointmentService {
    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    Appointment save(Appointment appointment);

    Appointment findByAppointmentId(Long appointmentId);
}
