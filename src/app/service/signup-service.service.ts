import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
// import { Admin } from '../model/admin_model';
import { environment } from 'src/environments/environment';
import { Patient } from '../model/patient_model';
import { Doctor } from '../model/doctor_model';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SignupServiceService {
  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;
  private signUpPatientUrl = this.baseUrl + '/patient/signup';
  private signUpDoctorUrl = this.baseUrl+ '/doctor/signup';
  private medicareServiceUrl = this.baseUrl+'/medicare';
  private token: string;


  constructor(public router: Router, private http: HttpClient) { }

  signUpPatient(patient: Patient) {
    return this.http.post(this.signUpPatientUrl, patient,{responseType: 'text'})
  }

  signUpDoctor(doctor: Doctor) {
    return this.http.post(this.signUpDoctorUrl, doctor, {responseType: 'text'});
  }
  detMedicareDetails(){
    return this.http.get(this.medicareServiceUrl);
  }
}
