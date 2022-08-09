
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { Patient } from "src/app/model/patient_model";
import { Medicare } from "src/app/model/medicare_service_model";
import { Doctor } from "src/app/model/doctor_model";
import Swal from "sweetalert2";
import { UpdateProfile } from "src/app/service/updateProfile.service";
@Component({
  selector: 'app-update-profile-doctor',
  templateUrl: './update-profile-doctor.component.html',
  styleUrls: ['./update-profile-doctor.component.css']
})
export class UpdateProfileDoctorComponent implements OnInit {
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
  doctorDetail;
  license="";
  ratings;
  medicareServices: Medicare[];

  submitted = false;
  today;
  UpdateDoctorForm: FormGroup;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private profileUpdate: UpdateProfile
  ) {
    this.today = new Date().toISOString().split("T")[0];
    this.profileUpdate.getDoctorDetials(localStorage.getItem('userId')).subscribe(res=>{
      this.doctorDetail = res;
      this.firstName = res.firstName;
      this.lastName = res.lastName;
      this.emailId = res.emailId;
      this.password = res.password;
      this.contactNumber= res.contactNumber;
      this.altContactNumber= res.altContactNumber;
      this.securityQuestion=res.securityQue;
      this.securityAnswer= res.securityAns;
      this.dateOfBirth= new Date(res.dateOfBirth);
      this.ratings = res.rating;
      this.gender=res.gender;
      this.address1=res.address1;
      this.address2= res.address2;
      this.city= res.city;
      this.state= res.state;
      this.zipcode=res.zipcode;
      this.hospitalName = res.hospitalName;
      this.degree = res.degree;
      this.speciality = res.speciality;
      this.workHours = res.workHours;
      this.medicareServiceName = res.medicareServiceId;
      this.license = res.license;

    });
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
    this.getDoctorDetails();
    this.UpdateDoctorForm = this.formBuilder.group(
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
      // {
      //   validator: this.mustMatch("password", "confirmPassword")
      // }
    );
  }
  getDoctorDetails(){

  }

  get f() {
    return this.UpdateDoctorForm.controls;
  }

  onSubmit() {
    this.submitted = true;
 
    const doctor: Doctor = {
      doctorId: parseInt(localStorage.getItem('userId')), //Random
      firstName: this.UpdateDoctorForm.value["firstName"],
      lastName: this.UpdateDoctorForm.value["lastName"],
      emailId: this.UpdateDoctorForm.value["emailId"],
      password: this.doctorDetail['password'],
      contactNumber: this.UpdateDoctorForm.value["contactNumber"],
      altContactNumber: this.UpdateDoctorForm.value["altContactNumber"],
      securityQue:this.securityQuestion,
      securityAns: this.securityAnswer,
      rating: this.doctorDetail['rating'],
      dateOfBirth: new Date(this.dateOfBirth),
      gender: this.UpdateDoctorForm.value["gender"],
      address1: this.UpdateDoctorForm.value["address1"],
      address2: this.UpdateDoctorForm.value["address2"],
      city: this.UpdateDoctorForm.value["city"],
      state: this.UpdateDoctorForm.value["state"],
      zipcode: this.UpdateDoctorForm.value["zipcode"],
      degree: this.UpdateDoctorForm.value["degree"],
      speciality: this.UpdateDoctorForm.value["speciality"],
      workHours: this.UpdateDoctorForm.value["workHours"],
      hospitalName: this.UpdateDoctorForm.value["hospitalName"],
      medicareServiceId:this.UpdateDoctorForm.value["medicareServiceName"],
      license:this.UpdateDoctorForm.value["license"]
    //   medicareService: this.medicareServices.find(
    //     m =>
    //       m.medicareService ===
    //       this.UpdateDoctorForm.value["medicareServiceName"]
    //   ),
    };
       
    this.profileUpdate.updateDoctorDetials(doctor).subscribe(
      (data) => {
        console.log(data, "Profile Update successful");
        Swal.fire("Good job!", "Your Profile has been updated!", "success");
        this.router.navigateByUrl("/doctor/home");
      },
      (err) => console.log("Error!")
    );

  //   Swal.fire(
  //     "Good job!",
  //     "Your Profile has been updated!",
  //     "success"
  //   );      this.router.navigateByUrl('/doctor/home');
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
