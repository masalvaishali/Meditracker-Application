import { Doctor } from 'src/app/model/doctor_model';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import Swal from "sweetalert2";
import { Patient } from "../model/patient_model";

@Injectable({
  providedIn: "root",
})
export class UpdateProfile {
  redirectUrl = "/";
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;
  private updateProfilePatientUrl = this.baseUrl + "/patient/update";
  private getPatientDetialUrl = this.baseUrl + "/patient/";
  private getDoctorDetialUrl = this.baseUrl + "/doctor/";

  constructor(public router: Router, private http: HttpClient) {}

  ngOnInit() {}

  updatePatientDetials(patient: Patient): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt_token'));
    return this.http.put(this.updateProfilePatientUrl, patient, {
      headers:headers,
      responseType: "text",
    });
  }

  getPatientDetials(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt_token'));
    return this.http.get(this.getPatientDetialUrl + id, {
      headers:headers
    });
  }

  getDoctorDetials(id): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt_token'));
    return this.http.get(this.getDoctorDetialUrl + id, {
      headers:headers
    });
  }

  updateDoctorDetials(doctor: Doctor): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('jwt_token'));
    return this.http.put(this.getDoctorDetialUrl+'update', doctor, {
      headers:headers,
      responseType: "text",
    });
  }
  // }
}
