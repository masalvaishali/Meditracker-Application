// import { Agents } from "./../model/agents_model";
import { Doctor } from "src/app/model/doctor_model";
// import { Admin } from "src/app/model/admin_model";
import { PatientService } from "./../service/patient.service";
import { DoctorService } from "src/app/service/doctor.service";
import { LoginServiceService } from "./../service/login-service.service";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormControl,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";
import { Patient } from "../model/patient_model";
import Swal from "sweetalert2";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  emailId: "";
  password: "";
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  user_object;
  jwt_token;
  submitted = false;

  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService,
    private doctorService: DoctorService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: new FormControl(this.emailId, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        Validators.pattern(this.emailPattern)
      ]),

      password: new FormControl(this.password, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService
      .authenticate(this.loginForm.value.emailId, this.loginForm.value.password)

      .subscribe(
        response => {
          this.loginService.loggedIn = true;
          // console.log(response.headers);
          response.headers
          .keys()
          .forEach(keyName =>{
            if(keyName == 'authorization'){
              this.user_object = this.parseJwt(response.headers.get(
                keyName
              ));
              this.jwt_token = response.headers.get(
                keyName
              )};
           }
          );
          this.loginService
            .getUserId(this.loginForm.value.emailId, this.jwt_token, this.user_object['authorities'][0])
            .subscribe((userId: number) => {
              this.loginService.loggedInUserId = userId;
              localStorage.setItem("jwt_token", this.jwt_token);
              if (this.user_object['authorities'][0] === "ROLE_DOCTOR") {
                localStorage.setItem("role", this.user_object['authorities'][0]);
                localStorage.setItem("userId", userId.toString());

                this.loginService.loggedInRole = this.user_object['authorities'][0];

                this.doctorService
                  .getDoctor(+localStorage.getItem("userId"),this.jwt_token)
                  // .getDoctor(+localStorage.getItem("userId"))
                  .subscribe((res: Doctor) => {
                    // if (res.approve == true) {
                      localStorage.setItem(
                        "username",
                        res.firstName + " " + res.lastName
                      );
                      localStorage.setItem("gender", res.gender);
                      this.loginService.loggedInUserName =
                        res.firstName + " " + res.lastName;
                      this.loginService.loggedInGender = res.gender;
                      console.log(
                        this.loginService.loggedInUserName +
                          " " +
                          this.loginService.loggedInGender
                      );
                      this.router.navigateByUrl("/doctor/home");
                    // }
                  });
              } else if (this.user_object['authorities'][0] === "ROLE_PATIENT") {
                localStorage.setItem("role", this.user_object['authorities'][0]);
                localStorage.setItem("userId", userId.toString());

                this.loginService.loggedInRole = this.user_object['authorities'][0];

                this.patientService
                  .getPatient(+localStorage.getItem("userId"), this.jwt_token)
                  .subscribe((res: Patient) => {
                    // if (res.approve) {
                      localStorage.setItem(
                        "username",
                        res.firstName + " " + res.lastName
                      );
                      localStorage.setItem("gender", res.gender);
                      this.loginService.loggedInUserName =
                        res.firstName + " " + res.lastName;
                      this.loginService.loggedInGender = res.gender;
                      console.log(
                        this.loginService.loggedInUserName +
                          " " +
                          this.loginService.loggedInGender
                      );
                      this.router.navigateByUrl("/patient/home");
                    // } else {
                    //   Swal.fire(
                    //     "Sorry!",
                    //     "Your request is pending with admin. You can sign in once he approves.",
                    //     "error"
                    //   );
                    // }
                  });
              } 
    
            });
        },
        res => {
          console.log("Error!" + res);
          Swal.fire(
            "Invalid Credentials",
            "You may have entered incorrect username or password.",
            "error"
          );
        }
      );
  }
}
