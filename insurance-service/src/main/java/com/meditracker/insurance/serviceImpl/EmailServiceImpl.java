package com.meditracker.insurance.serviceImpl;


import com.meditracker.insurance.dto.PatientDTO;
import com.meditracker.insurance.model.Insurance;
import com.meditracker.insurance.service.EmailService;
import com.meditracker.insurance.service.InsuranceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {
    @Autowired
    JavaMailSender mailSender;

    @Autowired
    InsuranceService insuranceService;

    public void sendEmail(String toEmail,String cc, String subject, String bodyText){
        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setFrom("meditrackeremailservice@gmail.com");
        mailMessage.setTo(toEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(bodyText);
        mailMessage.setCc(cc);

        mailSender.send(mailMessage);
        System.err.println("mail sent...");
    }

    public void sendEmailAttachment(String toEmail, String cc, String subject, String bodyText, String fileName, InputStreamSource attachment) throws MessagingException {
        MimeMessage mimeMessage = mailSender.createMimeMessage();

        MimeMessageHelper mimeMessageHelper=new MimeMessageHelper(mimeMessage, true);
        mimeMessageHelper.setFrom("meditrackeremailservice@gmail.com");
        mimeMessageHelper.setTo(toEmail);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(bodyText);
        mimeMessageHelper.setCc(cc);
        mimeMessageHelper.addAttachment(fileName,attachment);
        mailSender.send(mimeMessage);
    }


    @Override
    public String makeBody(PatientDTO patientDTO, String conditon) {
        Insurance insurance = insuranceService.findByPatientId(patientDTO.getPatientId());
        String onWayToHospital="is on the way to be admitted to a hospital";
        String inSeriousCondition="has been diagnosed with a serious medical condition";
        if(insurance==null)
            return null;
        try {
            String body =
                    "Dear " + insurance.getInsuranceProvider() + ",\n\n" +
                            "This is to bring to your attention that a person insured by you " +
                            ((conditon.equalsIgnoreCase("hospital")) ? onWayToHospital : inSeriousCondition) + " and may require insurance coverage soon.\n\n" +
                            "Kindly prepare for enabling a speedy settlement. Further details on the insured person can be found below:\n\n" +
                            "Name: " + patientDTO.getFirstName() + " " + patientDTO.getLastName() + "\n" +
                            "Email: " + patientDTO.getEmailId() + "\n" +
                            "Phone No.: " + patientDTO.getContactNumber() + "\n" +
                            "Address: " + patientDTO.getAddress1() + " " + patientDTO.getAddress2() +" "+patientDTO.getCity()+" "+patientDTO.getState()+
                            " "+ patientDTO.getZipcode()+ "\n\n" +
                            "Insurance Policy Number: " + insurance.getInsuranceNumber() + "\n" +
                            "Insurance Provider: "+insurance.getInsuranceProvider()+"\n\n"+
                            "Regards,\n" +
                            "MediTracker Service Team.";
            return body;
        }catch (Exception e){
            return null;
        }
    }

    @Override
    public String makeSubject(PatientDTO patientDTO) {
        Insurance insurance = insuranceService.findByPatientId(patientDTO.getPatientId());
        if(insurance==null)
            return null;
        try {
            String subject = patientDTO.getFirstName().toUpperCase() + " " + patientDTO.getLastName().toUpperCase() + " with POLICY NO. " +
                    insurance.getInsuranceNumber() + " may need medical insurance assistance soon.";
            return subject;
        }catch (Exception e){
            return null;
        }
    }


}
