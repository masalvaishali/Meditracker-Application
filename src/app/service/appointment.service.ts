// import { Agents } from './../model/agents_model';
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

  private appointmentUrl = this.baseUrl + '/patient/appointment/book';
  private getAppointmentsPatientUrl = this.baseUrl + '/appointment/patient/';
  private getAppByPatientUpcoming = this.baseUrl + '/patient/';

  private getAppByDoctorUpcoming = this.baseUrl + '/doctor/';

  private getAppByPatientPast = this.baseUrl + '/appointment/patient/past/';
  private getAppByDocUrl = this.baseUrl + '/appointment/doctor/';

  private getAppByDocUpcomingUrl = this.baseUrl + '/doctor/';

  private getAppByDocPastUrl = this.baseUrl + '/appointment/doctor/past/';
  private getAppByAgentUrl = this.baseUrl + '/appointment/agent/';

  private setAppApprovalUrl = this.baseUrl + '/doctor/appointment/update';
  
  private getAppIdUrl = this.baseUrl + '/appointment/id/';



  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('jwt_token')
    })
  };

  constructor(public router: Router, private http: HttpClient) { }

  book(appointment) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem('jwt_token'));
    return this.http.post(this.appointmentUrl, appointment, {headers});
  }

  getPatientsDoctor(patientId: number) {
    return this.http.get(this.getAppointmentsPatientUrl + patientId, this.authCredentials);
  }
  getAppointmenstByDoctor(doctor: Doctor) {
    return this.http.post(this.getAppByDocUrl, doctor, this.authCredentials);
  }
  // getAppointmenstByAgent(agent: Agents) {
  //   return this.http.post(this.getAppByAgentUrl, agent, this.authCredentials);
  // }

  getPatientsDoctorAppointmentsUpcoming() {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem('jwt_token'));
    return this.http.get(this.getAppByPatientUpcoming + localStorage.getItem('userId')+'/appointment', {headers:headers});
  }

  getPatientsDoctorAppointmentsPast(patientId: number) {
    return this.http.get(this.getAppByPatientPast + patientId+'/appointment', this.authCredentials);
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
    console.log('came here');
    return this.http.get(this.getAppByDocUpcomingUrl+doctor.doctorId+'/appointment', this.authCredentials);

  }
  getByDoctorPast(doctor: Doctor) {
    return this.http.post(this.getAppByDocPastUrl, doctor, this.authCredentials);

  }

}
