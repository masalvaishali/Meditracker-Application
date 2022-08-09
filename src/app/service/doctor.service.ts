import { MedicalTest } from './../model/medical_test';
import { Medicare } from './../model/medicare_service_model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Doctor } from '../model/doctor_model';
import { Patient } from '../model/patient_model';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;
  
  private doctorsUrl = this.baseUrl + '/doctors/';
  private updateTestResultUrl = this.baseUrl + '/doctors/medicaltest/';
  private updateDoctorApprovalUrl = this.baseUrl + '/doctors/';
  private getAllDoctorsByMedicareServiceUrl = this.baseUrl + '/doctors/medicareservice/';
  private getPatientsDoctorUrl = this.baseUrl + '/doctors/patients/';

  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin@clinix.com:admin')
    })
  };

  constructor(public router: Router, private http: HttpClient) { }

  getAllDoctors() {
    return this.http.get(this.doctorsUrl, this.authCredentials);
  }
  getDoctor(id) {
    return this.http.get(this.doctorsUrl + id, this.authCredentials);
  }

  updateDoctorApproval(doctor: Doctor) {
    return this.http.put<Doctor>(this.updateDoctorApprovalUrl, doctor, this.authCredentials);
  }

  getAllDoctorsByMedicareService(medicare: Medicare) {
    return this.http.post(this.getAllDoctorsByMedicareServiceUrl, medicare, this.authCredentials);
  }

  updateTestResult(medicalTest: MedicalTest) {
    return this.http.post(this.updateTestResultUrl, medicalTest, this.authCredentials)
  }

}
