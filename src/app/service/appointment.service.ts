import { Agents } from './../model/agents_model';
import { Doctor } from 'src/app/model/doctor_model';
import { Appointment } from './../model/appointment_model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;

  private appointmentUrl = this.baseUrl + '/appointment/';
  private getAppointmentsPatientUrl = this.baseUrl + '/appointment/patient/';
  private getAppByPatientUpcoming = this.baseUrl + '/appointment/patient/future/';
  private getAppByPatientPast = this.baseUrl + '/appointment/patient/past/';
  private getAppByDocUrl = this.baseUrl + '/appointment/doctor/';
  private getAppByDocUpcomingUrl = this.baseUrl + '/appointment/doctor/future/';
  private getAppByDocPastUrl = this.baseUrl + '/appointment/doctor/past/';
  private getAppByAgentUrl = this.baseUrl + '/appointment/agent/';
  private setAppApprovalUrl = this.baseUrl + '/appointment/status/';
  private getAppIdUrl = this.baseUrl + '/appointment/id/';



  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin@clinix.com:admin')
    })
  };

  constructor(public router: Router, private http: HttpClient) { }

  book(appointment: Appointment) {
    return this.http.post(this.appointmentUrl, appointment, this.authCredentials);
  }

  getPatientsDoctor(patientId: number) {
    return this.http.get(this.getAppointmentsPatientUrl + patientId, this.authCredentials);
  }
  getAppointmenstByDoctor(doctor: Doctor) {
    return this.http.post(this.getAppByDocUrl, doctor, this.authCredentials);
  }
  getAppointmenstByAgent(agent: Agents) {
    return this.http.post(this.getAppByAgentUrl, agent, this.authCredentials);
  }

  getPatientsDoctorAppointmentsUpcoming(patientId: number) {
    return this.http.get(this.getAppByPatientUpcoming + patientId, this.authCredentials);
  }

  getPatientsDoctorAppointmentsPast(patientId: number) {
    return this.http.get(this.getAppByPatientPast + patientId, this.authCredentials);
  }

  updateAppointmentApproval(appointment: Appointment) {
    return this.http.put<Appointment>(this.setAppApprovalUrl, appointment, this.authCredentials);
  }

  getAppointmentId(app: Appointment) {
    return this.http.post(this.getAppIdUrl, app, this.authCredentials)
  }

  getAppointment(id) {
    return this.http.get(this.appointmentUrl + id, this.authCredentials)
  }

  getByDoctorUpcoming(doctor: Doctor) {
    return this.http.post(this.getAppByDocUpcomingUrl, doctor, this.authCredentials);

  }
  getByDoctorPast(doctor: Doctor) {
    return this.http.post(this.getAppByDocPastUrl, doctor, this.authCredentials);

  }

}
