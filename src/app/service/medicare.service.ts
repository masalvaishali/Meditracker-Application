import { Medicare } from 'src/app/model/medicare_service_model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class MedicareService {
  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;
  private medicareServiceUrl = this.baseUrl + '/medicareservice/';
 
  authCredentials = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Basic ' + btoa('admin@clinix.com:admin')
    })
  };

  constructor(public router: Router, private http: HttpClient) { }

  getAllmedicareService() {
    return this.http.get(this.medicareServiceUrl, this.authCredentials);
  }

  

  addMedicareService(medicare: Medicare) {
    return this.http.post(this.medicareServiceUrl, medicare, this.authCredentials)
  }
}
