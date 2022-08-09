package com.meditracker.insurance.service;

import com.meditracker.insurance.dto.PatientDTO;
import org.springframework.core.io.InputStreamSource;

import javax.mail.MessagingException;

public interface EmailService {
    void sendEmail(String email,String cc,  String subject, String bodyText);

    String makeBody(PatientDTO patientDTO, String condition);

    String makeSubject(PatientDTO patientDTO);

    public void sendEmailAttachment(String toEmail, String cc, String subject, String bodyText, String fileName, InputStreamSource attachment) throws MessagingException;
}
