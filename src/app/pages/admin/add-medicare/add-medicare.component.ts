import { LoginServiceService } from "src/app/service/login-service.service";
import { Medicare } from "src/app/model/medicare_service_model";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import { MedicareService } from "src/app/service/medicare.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-add-medicare",
  templateUrl: "./add-medicare.component.html",
  styleUrls: ["./add-medicare.component.css"]
})
export class AddMedicareComponent implements OnInit {
  medicareName = "";
  medicareDescription = "";
  amount = 0;

  submitted = false;

  addmedicareService: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medicareService: MedicareService,
    private loginservice: LoginServiceService
  ) {}

  ngOnInit() {
    this.addmedicareService = this.formBuilder.group({
      medicareName: new FormControl(this.medicareName, [
        Validators.required,
        Validators.minLength(4)
      ]),
      medicareDescription: new FormControl(this.medicareDescription, [
        Validators.required,
        Validators.minLength(4)
      ]),
      amount: new FormControl(this.amount, [
        Validators.required,
        Validators.minLength(3)
      ])
    });
  }

  get f() {
    return this.addmedicareService.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.addmedicareService.invalid) {
      return;
    }

    console.log(this.addmedicareService.value);

    const medicare: Medicare = {
      medicareServiceId: 1, //Random
      medicareService: this.addmedicareService.value["medicareName"],
      serviceDescription: this.addmedicareService.value["medicareDescription"],
      amount: this.addmedicareService.value["amount"]
    };

    console.log("ADMIN :" + medicare);

    this.medicareService.addMedicareService(medicare).subscribe(() => {
      Swal.fire(
        "Added!",
        "Medicare Service has been added successfully",
        "success"
      );
      this.router.navigateByUrl("admin/manage-medicare");
    });
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
