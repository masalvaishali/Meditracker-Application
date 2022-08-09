import { Agents } from "./../model/agents_model";
import { Doctor } from "src/app/model/doctor_model";
import { Admin } from "src/app/model/admin_model";
import { PatientService } from "./../service/patient.service";
import { DoctorService } from "src/app/service/doctor.service";
import { AgentsService } from "./../service/agent.service";
import { AdminService } from "./../service/admin.service";
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

  submitted = false;

  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginServiceService,
    private adminService: AdminService,
    private agentService: AgentsService,
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

  onSubmit() {
    this.submitted = true;
    //   this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.loginService
      .authenticate(this.loginForm.value.emailId, this.loginForm.value.password)

      .subscribe(
        res => {
          this.loginService.loggedIn = true;
          this.loginService
            .getUserId(this.loginForm.value.emailId)
            .subscribe((userId: number) => {
              this.loginService.loggedInUserId = userId;

              if (res.role === "ROLE_ADMIN") {
                localStorage.setItem("role", res.role);
                localStorage.setItem("userId", userId.toString());

                this.loginService.loggedInRole = res.role;
                this.adminService
                  .getAdmin(+localStorage.getItem("userId"))
                  .subscribe((res: Admin) => {
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
                    this.router.navigateByUrl("/admin/home");
                  });
              } else if (res.role === "ROLE_DOCTOR") {
                localStorage.setItem("role", res.role);
                localStorage.setItem("userId", userId.toString());

                this.loginService.loggedInRole = res.role;

                this.doctorService
                  .getDoctor(+localStorage.getItem("userId"))
                  .subscribe((res: Doctor) => {
                    if (res.approve == true) {
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
                    } else {
                      Swal.fire(
                        "Sorry!",
                        "Your request is pending with admin. You can sign in once he approves.",
                        "error"
                      );
                    }
                  });
              } else if (res.role === "ROLE_PATIENT") {
                localStorage.setItem("role", res.role);
                localStorage.setItem("userId", userId.toString());

                this.loginService.loggedInRole = res.role;

                this.patientService
                  .getPatient(+localStorage.getItem("userId"))
                  .subscribe((res: Patient) => {
                    if (res.approve) {
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
                    } else {
                      Swal.fire(
                        "Sorry!",
                        "Your request is pending with admin. You can sign in once he approves.",
                        "error"
                      );
                    }
                  });
              } else {
                localStorage.setItem("role", res.role);
                localStorage.setItem("userId", userId.toString());

                this.loginService.loggedInRole = res.role;

                this.agentService
                  .getAgent(+localStorage.getItem("userId"))
                  .subscribe((res: Agents) => {
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
                    this.router.navigateByUrl("/agent/home");
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
