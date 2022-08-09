import { AppModule } from './../../../app.module';
import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/appointment_model';
import { DoctorService } from 'src/app/service/doctor.service';
import { Router } from '@angular/router';
import { AppointmentService } from 'src/app/service/appointment.service';
import { LoginServiceService } from 'src/app/service/login-service.service';

@Component({
  selector: 'app-viewappointmentstatus',
  templateUrl: './viewappointmentstatus.component.html',
  styleUrls: ['./viewappointmentstatus.component.css']
})
export class ViewappointmentstatusComponent implements OnInit {

  appointments: Appointment[];
  patientId: number;
  currdate: Date;
  // isCurrentDateGreater = false;


  // tslint:disable-next-line: max-line-length
  constructor(private docService: DoctorService, private router: Router, private appointmentService: AppointmentService, private loginservice: LoginServiceService) { }

  ngOnInit() {


    this.currdate = new Date();
    this.patientId = +localStorage.getItem('userId');

    this.appointmentService.getPatientsDoctorAppointmentsUpcoming(this.patientId).subscribe((res: Appointment[]) => {
      this.appointments = res;
    });
  }
}
