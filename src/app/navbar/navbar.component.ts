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
  role;

  constructor(public loginService: LoginServiceService, private router: Router) {
    
   }

  ngOnInit() {
    this.role = localStorage.getItem('role');
    // console.log(this.gender + " " + this.username)
  }

  logOut() {
    this.loginService.logout();
  }
  ngDoCheck(){
    this.role = localStorage.getItem('role');
  }

  goToDashboard() {
    if (this.loginService.loggedInRole === 'ROLE_DOCTOR') {
      this.router.navigateByUrl('/doctor/home')
    }
    if (this.loginService.loggedInRole === 'ROLE_PATIENT') {
      this.router.navigateByUrl('/patient/home')
    }
   
  }
}
