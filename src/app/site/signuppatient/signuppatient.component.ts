import { SignupServiceService } from './../../service/signup-service.service';
import { Patient } from "./../../model/patient_model";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Admin } from "src/app/model/admin_model";
import Swal from 'sweetalert2';

@Component({
  selector: "app-signuppatient",
  templateUrl: "./signuppatient.component.html",
  styleUrls: ["./signuppatient.component.css"]
})
export class SignuppatientComponent implements OnInit {
  adminId = 0;
  firstName = "";
  lastName = "";
  gender = "";
  dateOfBirth = new Date();
  contactNumber = "";
  altContactNumber = "";
  emailId = "";
  password = "";
  confirmPassword = "";
  securityQuestion = "";
  securityAnswer = "";
  address1 = "";
  address2 = "";
  city = "";
  state = "";
  zipcode = 0;
  approve = false;

  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  signUpPatientForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private signUpService : SignupServiceService) {}

  ngOnInit() {
    this.signUpPatientForm = this.formBuilder.group(
      {
        firstName: new FormControl(this.firstName, [
          Validators.required,
          Validators.minLength(4)
        ]),
        lastName: new FormControl(this.lastName, [
          Validators.required,
          Validators.minLength(4)
        ]),
        password: new FormControl(this.password, [
          Validators.required,
          Validators.minLength(4)
        ]),
        confirmPassword: new FormControl(this.confirmPassword, [
          Validators.required,
          Validators.minLength(4)
        ]),
        emailId: new FormControl(this.emailId, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
          Validators.pattern(this.emailPattern)
        ]),
        securityQuestion: new FormControl(this.securityQuestion, [
          Validators.required
        ]),
        securityAnswer: new FormControl(this.securityAnswer, [
          Validators.required
        ]),
        contactNumber: new FormControl(this.contactNumber, [
          Validators.required,
          Validators.minLength(4)
        ]),
        dateOfBirth: new FormControl(
          '',
          [Validators.required]
        ),
        gender: new FormControl(this.gender, [Validators.required]),
        address1: new FormControl(this.address1, [
          Validators.required,
          Validators.minLength(4)
        ]),
        address2: new FormControl(this.address2),
        city: new FormControl(this.city, [
          Validators.required,
          Validators.minLength(4)
        ]),
        state: new FormControl(this.state, [Validators.required]),
        zipcode: new FormControl(this.zipcode, [
          Validators.required,
          Validators.minLength(4)
        ]),

        altContactNumber: new FormControl(this.altContactNumber)
      },
      {
        validator: this.mustMatch("password", "confirmPassword")
      }
    );
  }

  get f() {
    return this.signUpPatientForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpPatientForm.invalid) {
      return;
    }

    console.log(this.signUpPatientForm.value);

    const patient: Patient = {
      patientId: 1, //Random
      firstName: this.signUpPatientForm.value["firstName"],
      lastName: this.signUpPatientForm.value["lastName"],
      emailId: this.signUpPatientForm.value["emailId"],
      password: this.signUpPatientForm.value["password"],
      contactNumber: this.signUpPatientForm.value["contactNumber"],
      altContactNumber: this.signUpPatientForm.value["altContactNumber"],
      securityQuestion: this.signUpPatientForm.value["securityQuestion"],
      securityAnswer: this.signUpPatientForm.value["securityAnswer"],
      dateOfBirth: new Date(this.signUpPatientForm.value["dateOfBirth"]),
      gender: this.signUpPatientForm.value["gender"],
      address1: this.signUpPatientForm.value["address1"],
      address2: this.signUpPatientForm.value["address2"],
      city: this.signUpPatientForm.value["city"],
      state: this.signUpPatientForm.value["state"],
      zipcode: this.signUpPatientForm.value["zipcode"],
      approve: false
    };
    this.signUpService.signUpPatient(patient).subscribe(() => {
      console.log("Signup successful");
      Swal.fire(
        "Good job!",
        "Sign up successful. You can login once admin approves you.",
        "success"
      );      this.router.navigateByUrl('/login');
    }, (err) => console.log("Error!"));
   // console.log("PATIENT :" + patient);
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
