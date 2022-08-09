import { SignupServiceService } from "./../../service/signup-service.service";
import { Patient } from "./../../model/patient_model";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { UpdateProfile } from "src/app/service/updateProfile.service";

@Component({
  selector: "app-update-profile-patient",
  templateUrl: "./update-profile-patient.component.html",
  styleUrls: ["./update-profile-patient.component.css"],
})
export class UpdateProfilePatientComponent implements OnInit {
  adminId = 0;
  firstName = "";
  lastName = "";
  gender = "";
  dateOfBirth;
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
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  UpdatePatientForm: FormGroup;
  today;
  
  patientDetail;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    //  private signUpService: SignupServiceService,
    private profileUpdate: UpdateProfile
  ) {
    this.today = new Date().toISOString().split("T")[0];
    this.profileUpdate
      .getPatientDetials(localStorage.getItem("userId"))
      .subscribe((res) => {
        this.patientDetail = res;
        this.firstName = res.firstName;
        this.lastName = res.lastName;
        this.emailId = res.emailId;
        this.password = res.password;
        this.contactNumber = res.contactNumber;
        this.altContactNumber = res.altContactNumber;
        this.securityQuestion = res.securityQuestion;
        this.securityAnswer = res.securityAnswer;
        this.dateOfBirth = res.dateOfBirth;
        this.gender = res.gender;
        this.address1 = res.address1;
        this.address2 = res.address2;
        this.city = res.city;
        this.state = res.state;
        this.zipcode = res.zipcode;
      });
  }

  ngOnInit() {
    this.UpdatePatientForm = this.formBuilder.group(
      {
        firstName: new FormControl(this.firstName, [
          Validators.required,
          Validators.minLength(4),
        ]),
        lastName: new FormControl(this.lastName, [
          Validators.required,
          Validators.minLength(4),
        ]),
        password: new FormControl(this.password, [
          Validators.required,
          Validators.minLength(4),
        ]),
        confirmPassword: new FormControl(this.confirmPassword, [
          Validators.required,
          Validators.minLength(4),
        ]),
        emailId: new FormControl(this.emailId, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50),
          Validators.pattern(this.emailPattern),
        ]),
        securityQuestion: new FormControl(this.securityQuestion, [
          Validators.required,
        ]),
        securityAnswer: new FormControl(this.securityAnswer, [
          Validators.required,
        ]),
        contactNumber: new FormControl(this.contactNumber, [
          Validators.required,
          Validators.minLength(4),
        ]),
        dateOfBirth: new FormControl("", [Validators.required]),
        gender: new FormControl(this.gender, [Validators.required]),
        address1: new FormControl(this.address1, [
          Validators.required,
          Validators.minLength(4),
        ]),
        address2: new FormControl(this.address2),
        city: new FormControl(this.city, [
          Validators.required,
          Validators.minLength(4),
        ]),
        state: new FormControl(this.state, [Validators.required]),
        zipcode: new FormControl(this.zipcode, [
          Validators.required,
          Validators.minLength(4),
        ]),

        altContactNumber: new FormControl(this.altContactNumber),
      },
      {
        validator: this.mustMatch("password", "confirmPassword"),
      }
    );
    console.log(this.dateOfBirth);
    console.log(this.UpdatePatientForm.value);
    // this.UpdatePatientForm.control.setValue(this.patientDetail);
  }

  get f() {
    return this.UpdatePatientForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // if (this.UpdatePatientForm.invalid) {
    //   return;
    // }

    console.log(this.UpdatePatientForm.value);

    const patient: Patient = {
      patientId: parseInt(localStorage.getItem("userId")), //Random
      firstName: this.UpdatePatientForm.value["firstName"],
      lastName: this.UpdatePatientForm.value["lastName"],
      emailId: this.UpdatePatientForm.value["emailId"],
      password: this.password,
      contactNumber: this.UpdatePatientForm.value["contactNumber"],
      altContactNumber: this.UpdatePatientForm.value["altContactNumber"],
      securityQuestion: this.securityQuestion,
      securityAnswer: this.securityAnswer,
      dateOfBirth: this.UpdatePatientForm.value["dateOfBirth"],
      gender: this.UpdatePatientForm.value["gender"],
      address1: this.UpdatePatientForm.value["address1"],
      address2: this.UpdatePatientForm.value["address2"],
      city: this.UpdatePatientForm.value["city"],
      state: this.UpdatePatientForm.value["state"],
      zipcode: this.UpdatePatientForm.value["zipcode"],
    };
    //write this code after saving data.

    this.profileUpdate.updatePatientDetials(patient).subscribe(
      (data) => {
        console.log(data, "Profile Update successful");
        Swal.fire("Good job!", "Your Profile has been updated!", "success");
        this.router.navigateByUrl("/patient/home");
      },
      (err) => {
        console.log("Error!");
        Swal.fire("OOps!", "Some Error Came!", "error");
      }
    );
  }
  //   Swal.fire(
  //     "Good job!",
  //     "Your Profile has been updated!",
  //     "success"
  //   );      this.router.navigateByUrl('/patient/home');
  // }

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
