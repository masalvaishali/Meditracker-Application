import { PatientService } from './../../../service/patient.service';
import { Agents } from './../../../model/agents_model';
import { Appointment } from './../../../model/appointment_model';
import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { AppointmentService } from 'src/app/service/appointment.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { AgentsService } from 'src/app/service/agent.service';
import { Router } from '@angular/router';
import { Patient } from 'src/app/model/patient_model';

@Component({
  selector: 'app-agent-patients',
  templateUrl: './agent-patients.component.html',
  styleUrls: ['./agent-patients.component.css']
})
export class AgentPatientsComponent implements OnInit {

  appointments: Appointment[];
  agent: Agents;
  patients: Patient[] = [];


  constructor(private loginservice: LoginServiceService, private appointmentservice: AppointmentService, private docService: DoctorService, private agentService: AgentsService, private patientService: PatientService, private router: Router) { }

  ngOnInit() {

    this.agentService.getAgent(+localStorage.getItem('userId')).subscribe((res: Agents) => {
      this.agent = res;
      this.appointmentservice.getAppointmenstByAgent(this.agent).subscribe((res: Appointment[]) => {
        this.appointments = res;
        this.appointments.forEach((app) => {
          this.patientService.getPatient(app.patientId).subscribe((res: Patient) => this.patients.push(res));
        });
      });
    });

  }

}
