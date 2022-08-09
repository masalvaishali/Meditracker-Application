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
  
  private doctorsUrl = this.baseUrl + '/doctor/';
  private updateTestResultUrl = this.baseUrl + '/doctors/medicaltest/';
  private updateDoctorApprovalUrl = this.baseUrl + '/doctor/';
  private getAllDoctorsByMedicareServiceUrl = this.baseUrl + '/medicare/';
  private downloadRecordUrl = this.baseUrl + '/doctor/patient-record/downloadRecord/';

  authCredentials = {
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Basic ' + credentials);
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('jwt_token')
    })
  };

  constructor(public router: Router, private http: HttpClient) { }
  uploadRecords(obj){
    let headers = {
      headers: new HttpHeaders({
        // 'mimeType': 'multipart/form-data',
        'Authorization': localStorage.getItem('jwt_token')
      })
    }
    return this.http.post(this.doctorsUrl+'record', obj, headers);
  }
  getAllDoctors() {
    return this.http.get(this.doctorsUrl, this.authCredentials);
  }
  downloadRecord(id){
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem('jwt_token'));
    return this.http.get(this.downloadRecordUrl + id, {headers:headers,responseType: 'blob' as 'json'});
  }
  getDoctor(id, credentials) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', credentials);
    return this.http.get(this.doctorsUrl + id, {headers});
  }
  getDoctorPatRec(id) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', localStorage.getItem('jwt_token'));
    return this.http.get(this.baseUrl+`/doctor/${localStorage.getItem('userId')}/patient/${id}/record`, {headers});
  }
  // getDoctor(id) {

  //   return this.http.get(this.doctorsUrl + id, this.authCredentials);
  // }

  updateDoctorApproval(doctor: Doctor) {
    return this.http.put<Doctor>(this.updateDoctorApprovalUrl, doctor, this.authCredentials);
  }

  getAllDoctorsByMedicareService(id) {
    return this.http.get(this.getAllDoctorsByMedicareServiceUrl+id+'/doctors');
  }

  updateTestResult(medicalTest: MedicalTest) {
    return this.http.post(this.updateTestResultUrl, medicalTest, this.authCredentials)
  }

}
