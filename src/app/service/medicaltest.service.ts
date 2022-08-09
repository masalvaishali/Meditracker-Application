import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicaltestService {

  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;

  private medicalTestUrl = this.baseUrl + '/medicaltest/'

  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + localStorage.getItem('jwt_token')
    })
  };

  constructor(public router: Router, private http: HttpClient) { }

  getMedicalTest(id) {
    return this.http.get(this.medicalTestUrl + id, this.authCredentials)
  }

}
