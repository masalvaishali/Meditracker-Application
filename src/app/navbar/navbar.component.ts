import { Router } from '@angular/router';
import { LoginServiceService } from './../service/login-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  gender = ''
  username = ''
  loggedIn = false;

  constructor(public loginService: LoginServiceService, private router: Router) { }



  ngOnInit() {
    console.log(this.gender + " " + this.username)
  }

  logOut() {
    this.loginService.logout();
  }

  goToDashboard() {
    if (this.loginService.loggedInRole === 'ROLE_ADMIN') {
      this.router.navigateByUrl('/admin/home')
    }
    if (this.loginService.loggedInRole === 'ROLE_DOCTOR') {
      this.router.navigateByUrl('/doctor/home')
    }
    if (this.loginService.loggedInRole === 'ROLE_PATIENT') {
      this.router.navigateByUrl('/patient/home')
    }
    if (this.loginService.loggedInRole === 'ROLE_AGENT') {
      this.router.navigateByUrl('/agent/home')
    }
  }
}
