import { Agents } from './../../../model/agents_model';
import { AgentsService } from './../../../service/agent.service';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { AppointmentService } from 'src/app/service/appointment.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/model/appointment_model';

@Component({
  selector: 'app-agenthome',
  templateUrl: './agenthome.component.html',
  styleUrls: ['./agenthome.component.css']
})
export class AgenthomeComponent implements OnInit {

  appointments: Appointment[];
  agent: Agents;
  totalCommission = 0;

  constructor(private loginservice: LoginServiceService, private appointmentservice: AppointmentService, private docService: DoctorService, private agentService: AgentsService, private router: Router) { }

  ngOnInit() {

    this.agentService.getAgent(+localStorage.getItem('userId')).subscribe((res: Agents) => {
      this.agent = res;
      this.appointmentservice.getAppointmenstByAgent(this.agent).subscribe((res: Appointment[]) => {
        this.appointments = res;
        this.appointments.forEach((app) => {
          this.totalCommission += (app.doctor.medicareService.amount * (this.agent.commission / 100));
        });
      });
    });



  }

}
