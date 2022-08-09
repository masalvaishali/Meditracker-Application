import { SignupServiceService } from "./../../service/signup-service.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Patient } from "src/app/model/patient_model";
import { Doctor } from "src/app/model/doctor_model";
import Swal from "sweetalert2";

import {Medicare} from "../../model/medicare_service_model";

@Component({
  selector: "app-signupdoctor",
  templateUrl: "./signupdoctor.component.html",
  styleUrls: ["./signupdoctor.component.css"]
})
export class SignupdoctorComponent implements OnInit {
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
  degree = "";
  speciality = "";
  workHours = "";
  hospitalName = "";
  medicareServiceName = "";
  approve = false;
  medicareServiceId=0;
  license="";
  medicareServices: Medicare[];
  today;
  submitted = false;
  MedicareServiesAvailable;
  signUpDoctorForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private signUpService: SignupServiceService
  ) {
    this.today = new Date().toISOString().split("T")[0];
    this.medicareServices = [
      {
        medicareServiceId: 1,
        medicareService: "Neurologists",
        serviceDescription: "Bla bla bla",
        amount: 500
      },
      {
        medicareServiceId: 2,
        medicareService: "Cardiologist",
        serviceDescription:
          "They’re experts on the heart and blood vessels. You might see them for heart failure, a heart attack, high blood pressure, or an irregular heartbeat.",
        amount: 5000
      },
      {
        medicareServiceId: 3,
        medicareService: "Dermatologists",
        serviceDescription:
          "Have problems with your skin, hair, nails? Do you have moles, scars, acne, or skin allergies? Dermatologists can help.",
        amount: 1000
      },
      {
        medicareServiceId: 4,
        medicareService: "Dentist",
        serviceDescription:
          "A dentist, also known as a dental surgeon, is a surgeon who specializes in dentistry, the diagnosis, prevention, and treatment of diseases and conditions of the oral cavity.",
        amount: 1000
      },
      {
        medicareServiceId: 5,
        medicareService: "Pediatrician",
        serviceDescription:
          "A dentist, also known as a dental surgeon, is a surgeon who specializes in dentistry, the diagnosis, prevention, and treatment of diseases and conditions of the oral cavity.",
        amount: 1000
      }
    ];
  }

  ngOnInit() {
    // console.log(this.today);
    this.signUpService.detMedicareDetails().subscribe((data: Medicare[])=>{
      this.MedicareServiesAvailable = data;
    })
    this.signUpDoctorForm = this.formBuilder.group(
      {
        firstName: new FormControl(this.firstName, [
          Validators.required,
          Validators.minLength(4)
        ]),
        lastName: new FormControl(this.lastName, [
          Validators.required,
          Validators.minLength(4)
        ]),
        license:new FormControl(this.license,[
          Validators.required,
          Validators.minLength(6)
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
          Validators.minLength(10)
        ]),

        altContactNumber: new FormControl(this.altContactNumber, [
          Validators.minLength(10)
        ]),

        dateOfBirth: new FormControl("", [Validators.required]),
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
        degree: new FormControl(this.degree, [
          Validators.required,
          Validators.minLength(4)
        ]),
        speciality: new FormControl(this.speciality, [
          Validators.required,
          Validators.minLength(4)
        ]),
        workHours: new FormControl(this.workHours, [
          Validators.required,
          Validators.minLength(4)
        ]),
        hospitalName: new FormControl(this.hospitalName, [
          Validators.required,
          Validators.minLength(4)
        ]),
        medicareServiceName: new FormControl(this.medicareServiceName, [
          Validators.required
        ])
      },
      {
        validator: this.mustMatch("password", "confirmPassword")
      }
    );

  }

  get f() {
    return this.signUpDoctorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpDoctorForm.invalid) {
      return;
    }

    const doctor: Doctor = {
      doctorId: null, //Random
      firstName: this.signUpDoctorForm.value["firstName"],
      lastName: this.signUpDoctorForm.value["lastName"],
      emailId: this.signUpDoctorForm.value["emailId"],
      password: this.signUpDoctorForm.value["password"],
      contactNumber: this.signUpDoctorForm.value["contactNumber"],
      altContactNumber: this.signUpDoctorForm.value["altContactNumber"],
      securityQue: this.signUpDoctorForm.value["securityQuestion"],
      securityAns: this.signUpDoctorForm.value["securityAnswer"],
      dateOfBirth: new Date(this.signUpDoctorForm.value["dateOfBirth"]),
      gender: this.signUpDoctorForm.value["gender"],
      rating: {
        cumulativeRating: 5
      },
      address1: this.signUpDoctorForm.value["address1"],
      address2: this.signUpDoctorForm.value["address2"],
      city: this.signUpDoctorForm.value["city"],
      state: this.signUpDoctorForm.value["state"],
      zipcode: this.signUpDoctorForm.value["zipcode"],
      degree: this.signUpDoctorForm.value["degree"],
      speciality: this.signUpDoctorForm.value["speciality"],
      workHours: this.signUpDoctorForm.value["workHours"],
      hospitalName: this.signUpDoctorForm.value["hospitalName"],
      medicareServiceId:this.signUpDoctorForm.value["medicareServiceName"],
      license:this.signUpDoctorForm.value["license"]
    };

    this.signUpService.signUpDoctor(doctor).subscribe(
      () => {
        console.log("Signup successful");
        Swal.fire(
          "Good job!",
          "Sign up successful.",
          "success"
        );
        this.router.navigateByUrl("/login");
      },
      err => console.log("Error!")
    );
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
