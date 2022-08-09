import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Admin } from '../model/admin_model';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient_model';
import { Doctor } from '../model/doctor_model';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;
  private signUpAdminUrl = this.baseUrl + '/users/admin';
  private signUpPatientUrl = this.baseUrl + '/users/patient';
  private signUpDoctorUrl = this.baseUrl + '/users/doctor';
  private token: string;

  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin@clinix.com:admin')
    })
  };


  constructor(public router: Router, private http: HttpClient) { }

  signUpAdmin(admin: Admin) {

    return this.http.post(this.signUpAdminUrl, admin, this.authCredentials)
  }

  signUpPatient(patient: Patient) {

    return this.http.post(this.signUpPatientUrl, patient, this.authCredentials)

  }

  signUpDoctor(doctor: Doctor) {
    return this.http.post(this.signUpDoctorUrl, doctor, this.authCredentials);
  }
}
