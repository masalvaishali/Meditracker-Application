import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../model/patient_model';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;
  private patientsUrl = this.baseUrl + '/patients/';

  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin@clinix.com:admin')
    })
  };

  constructor(public router: Router, private http: HttpClient) { }

  getAllPatients() {
    return this.http.get(this.patientsUrl, this.authCredentials);
  }

  updatePatientApproval(patient: Patient) {
    return this.http.put<Patient>(this.patientsUrl, patient, this.authCredentials);
  }

  getPatient(id) {
    return this.http.get(this.patientsUrl + id, this.authCredentials);
  }

}
