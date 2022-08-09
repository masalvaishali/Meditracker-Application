import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment_model';
import { Patient } from 'src/app/model/patient_model';
import { Doctor } from 'src/app/model/doctor_model';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { AppointmentService } from 'src/app/service/appointment.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { PatientService } from 'src/app/service/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-testresults',
  templateUrl: './testresults.component.html',
  styleUrls: ['./testresults.component.css']
})
export class TestresultsComponent implements OnInit {

  appointments: Appointment[];
  patients: Patient[] = [];
  doctor: Doctor;

  // tslint:disable-next-line: max-line-length
  constructor(private loginservice: LoginServiceService, private appointmentservice: AppointmentService, private docService: DoctorService, private patientService: PatientService, private router: Router) { }

  ngOnInit() {

    this.docService.getDoctor(+localStorage.getItem('userId')).subscribe((res: Doctor) => {
      this.doctor = res;
      // tslint:disable-next-line: no-shadowed-variable
      this.appointmentservice.getByDoctorPast(this.doctor).subscribe((res: Appointment[]) => {
        this.appointments = res;
        this.appointments.forEach((app) => {
          // tslint:disable-next-line: no-shadowed-variable
          this.patientService.getPatient(app.patientId).subscribe((res: Patient) => this.patients.push(res));
        });
      });
    });
  }
  viewForm(app: Appointment) {

    this.appointmentservice.getAppointmentId(app).subscribe((id) => {

      this.router.navigateByUrl('/doctor/testresults/testresultform/' + id);
    });



  }

  viewReport(app: Appointment) {
    this.appointmentservice.getAppointmentId(app).subscribe((id) => {
      this.router.navigateByUrl('/doctor/testresults/viewreport/'+id);
    })

  }


}
