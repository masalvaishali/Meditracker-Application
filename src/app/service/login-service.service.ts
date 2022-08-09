import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  redirectUrl = '/';
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;

  loggedInUserId = 0;
  loggedInUserName = "";
  loggedInGender = "";
  loggedInRole = "";

  // authCredentials = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': 'Basic ' + 
  //   })
  // };

  constructor(public router: Router, private http: HttpClient) { }

  baseUrl = environment.baseUrl;
  private authenticationApiUrl = this.baseUrl + '/auth/login';
  getUserIdUrl = this.baseUrl + '/patient/getId';
  getDrIdUrl = this.baseUrl + '/doctor/getId';

  // private token: string;

  authenticate(user: string, password: string): Observable<any> {
    let credentials = btoa(user + ':' + password);
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Basic ' + credentials);
    return this.http.post(this.authenticationApiUrl, null, { headers: headers, observe:"response" })
  }

  logout() {
    this.loggedIn = false;
    this.loggedInUserId = 0;
    this.loggedInUserName = "";
    this.loggedInGender = "";
    localStorage.clear()
    this.router.navigateByUrl('/');
  }

  getUserId(username, credentials, role) {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', credentials);
    return role == 'ROLE_DOCTOR' ? this.http.get(this.getDrIdUrl+`?email=`+username, {headers:headers}): this.http.get(this.getUserIdUrl+`?email=`+username, {headers:headers});
  }

}
