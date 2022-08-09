import { MessageService } from 'src/app/service/message.service';

import { Appointment } from './../../../model/appointment_model';
import { Router } from '@angular/router';
import { DoctorService } from './../../../service/doctor.service';
import { AppointmentService } from './../../../service/appointment.service';
import { LoginServiceService } from './../../../service/login-service.service';
import { Component, OnInit } from '@angular/core';
import { Route } from '@angular/compiler/src/core';
import { Doctor } from 'src/app/model/doctor_model';
import { Patient } from 'src/app/model/patient_model';
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: 'app-viewappointments',
  templateUrl: './viewappointments.component.html',
  styleUrls: ['./viewappointments.component.css']
})
export class ViewappointmentsComponent implements OnInit {

  appointments: Appointment[];
  patients: Patient[] = [];
  doctor: Doctor;

  // tslint:disable-next-line: max-line-length
  constructor(private loginservice: LoginServiceService, private appointmentservice: AppointmentService, private docService: DoctorService, private patientService: PatientService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {

    this.docService.getDoctor(+localStorage.getItem('userId')).subscribe((res: Doctor) => {
      this.doctor = res;
      this.appointmentservice.getByDoctorUpcoming(this.doctor).subscribe((res: Appointment[]) => {
        this.appointments = res;
        this.appointments.forEach((app) => {
          this.patientService.getPatient(app.patientId).subscribe((res: Patient) => this.patients.push(res));
        });
      });
    });
  }


  ApproveOrRejectPatient(event, appointment: Appointment) {
    if (event.target.checked) {
      appointment.status = 'approved';
      this.patientService.getPatient(appointment.patientId).subscribe((p: Patient) => {
        this.messageService.sendSMS("Hi, " + p.firstName + ". Your appointment has been approved by Dr. " + this.doctor.firstName, p.contactNumber).subscribe((res) => {
          console.log(res);
        });
      });

      this.appointmentservice.updateAppointmentApproval(appointment).subscribe((res) => console.log(res));
    } else {
      appointment.status = 'rejected';
      this.appointmentservice.updateAppointmentApproval(appointment).subscribe((res) => console.log(res));
    }
  }

}
