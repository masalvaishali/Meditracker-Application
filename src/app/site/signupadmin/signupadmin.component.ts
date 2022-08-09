import { SignupServiceService } from './../../service/signup-service.service';
import { Admin } from "./../../model/admin_model";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-signupadmin",
  templateUrl: "./signupadmin.component.html",
  styleUrls: ["./signupadmin.component.css"]
})
export class SignupadminComponent implements OnInit {
  adminId = 0;
  firstName = "";
  lastName = "";
  gender = "";
  dateOfBirth = new Date();
  contactNumber = "";
  altContactNumber = "";
  email = "";
  password = "";
  confirmPassword = "";
  securityQuestion = "";
  securityAnswer = "";

  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  signUpAdminForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,private signUpService: SignupServiceService) {}

  ngOnInit() {
    this.signUpAdminForm = this.formBuilder.group(
      {
        'firstName': new FormControl(this.firstName, [
          Validators.required,
          Validators.minLength(4)
        ]),
        'lastName': new FormControl(this.lastName, [
          Validators.required,
          Validators.minLength(4)
        ]),
        'password': new FormControl(this.password, [
          Validators.required,
          Validators.minLength(4)
        ]),
        'confirmPassword': new FormControl(this.confirmPassword, [
          Validators.required,
          Validators.minLength(4)
        ]),
        'email': new FormControl(this.email, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(100),
          Validators.pattern(this.emailPattern)
        ]),
        'securityQuestion': new FormControl(this.securityQuestion, [
          Validators.required
        ]),
        'securityAnswer': new FormControl(this.securityAnswer, [
          Validators.required
        ]),
        'contactNumber': new FormControl(this.contactNumber, [
          Validators.required,
          Validators.minLength(4)
        ]),
        'dateOfBirth': new FormControl(
          this.dateOfBirth.toString().substring(0, 10),
          [Validators.required]
        ),
        'gender': new FormControl(
          this.gender,
          [Validators.required]
        ),
        
        'altContactNumber': new FormControl(this.altContactNumber)
      },
      {
        validator: this.mustMatch("password", "confirmPassword")
      }
    );
  }

  get f() { return this.signUpAdminForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.signUpAdminForm.invalid) {
      return;
    }

    console.log(this.signUpAdminForm.value);

    const admin: Admin = {
      adminId: 1, //Random
      firstName: this.signUpAdminForm.value['firstName'],
      lastName: this.signUpAdminForm.value['lastName'],
      email: this.signUpAdminForm.value['email'],
      password: this.signUpAdminForm.value['password'],
      contactNumber: this.signUpAdminForm.value['contactNumber'],
      altContactNumber: this.signUpAdminForm.value['altContactNumber'],
      securityQue: this.signUpAdminForm.value['securityQuestion'],
      securityAns: this.signUpAdminForm.value['securityAnswer'],
      dateOfBirth: new Date(this.signUpAdminForm.value['dateOfBirth']),
      gender: this.signUpAdminForm.value['gender'],
      age: 0
    };

    console.log('ADMIN :' + admin);


    this.signUpService.signUpAdmin(admin).subscribe(()=>
    console.log("SignUp Success")
    )
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


