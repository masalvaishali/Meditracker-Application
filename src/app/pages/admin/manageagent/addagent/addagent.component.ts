import { Agents } from "src/app/model/agents_model";
import { AgentsService } from "./../../../../service/agent.service";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: "app-addagent",
  templateUrl: "./addagent.component.html",
  styleUrls: ["./addagent.component.css"]
})
export class AddagentComponent implements OnInit {
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
  address1 = "";
  address2 = "";
  city = "";
  state = "";
  zipcode = 0;

  submitted = false;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$";

  signUpAgentForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private agentService: AgentsService
  ) {}

  ngOnInit() {
    this.signUpAgentForm = this.formBuilder.group(
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
        ])
      },
      {
        validator: this.mustMatch("password", "confirmPassword")
      }
    );
  }

  get f() {
    return this.signUpAgentForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.signUpAgentForm.invalid) {
      return;
    }

    console.log(this.signUpAgentForm.value);

    const agent: Agents = {
      agentId: 1, //Random
      firstName: this.signUpAgentForm.value["firstName"],
      lastName: this.signUpAgentForm.value["lastName"],
      emailId: this.signUpAgentForm.value["emailId"],
      password: this.signUpAgentForm.value["password"],
      contactNumber: this.signUpAgentForm.value["contactNumber"],
      altContactNumber: this.signUpAgentForm.value["altContactNumber"],
      dateOfBirth: new Date(this.signUpAgentForm.value["dateOfBirth"]),
      gender: this.signUpAgentForm.value["gender"],
      address1: this.signUpAgentForm.value["address1"],
      address2: this.signUpAgentForm.value["address2"],
      city: this.signUpAgentForm.value["city"],
      state: this.signUpAgentForm.value["state"],
      zipcode: this.signUpAgentForm.value["zipcode"],
      commission: 10,
      age: 0
    };

    console.log("ADMIN :" + agent);

    this.agentService.addAgent(agent).subscribe(() => {
      Swal.fire("Added!", "Agent has been added successfully", "success");
      this.router.navigateByUrl("admin/manage-agent");
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
