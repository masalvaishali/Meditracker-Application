package com.meditracker.appointment.serviceImpl;

import com.meditracker.appointment.model.Appointment;
import com.meditracker.appointment.repository.AppointmentRepository;
import com.meditracker.appointment.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    AppointmentRepository appointmentRepository;

    @Override
    public List<Appointment> findByPatientId(Long patientId) {
        return appointmentRepository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> findByDoctorId(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId);
    }

    @Override
    public Appointment save(Appointment appointment) {
        return appointmentRepository.save(appointment);
    }

    @Override
    public Appointment findByAppointmentId(Long appointmentId) {
        return appointmentRepository.findByAppointmentId(appointmentId);
    }
}
