import { Router } from '@angular/router';
import { LoginServiceService } from './service/login-service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clinix';

  constructor(private loginservice: LoginServiceService, private router: Router) {
    if (localStorage.length > 0) {
      this.loginservice.loggedIn = true;
      this.loginservice.loggedInUserId = +localStorage.getItem('userId');
      this.loginservice.loggedInUserName = localStorage.getItem('username');
      this.loginservice.loggedInGender = localStorage.getItem('gender');
      this.loginservice.loggedInRole = localStorage.getItem('role');
      if (this.loginservice.loggedInRole === 'ROLE_ADMIN') {
        router.navigateByUrl('/admin/home')
      }
      if (this.loginservice.loggedInRole === 'ROLE_DOCTOR') {
        router.navigateByUrl('/doctor/home')
      }
      if (this.loginservice.loggedInRole === 'ROLE_AGENT') {
        router.navigateByUrl('/agent/home')
      }
      if (this.loginservice.loggedInRole === 'ROLE_PATIENT') {
        router.navigateByUrl('/patient/home')
      }
    }else{
      this.loginservice.loggedIn = false;
      this.loginservice.loggedInUserId = 0;
      this.loginservice.loggedInUserName = '';
      this.loginservice.loggedInGender = '';
      this.loginservice.loggedInRole = '';
    }
  }



}
