import { MessageService } from "src/app/service/message.service";
import { LoginServiceService } from "./../../../../service/login-service.service";
import { AgentsService } from "./../../../../service/agent.service";
import { Agents } from "./../../../../model/agents_model";
import { MedicareService } from "./../../../../service/medicare.service";
import { AppointmentService } from "./../../../../service/appointment.service";
import { Appointment } from "./../../../../model/appointment_model";
import { PatientService } from "./../../../../service/patient.service";
import { DoctorService } from "./../../../../service/doctor.service";
import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormGroup,
  FormBuilder,
  FormControl
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Medicare } from "src/app/model/medicare_service_model";
import { Doctor } from "src/app/model/doctor_model";
import Swal from "sweetalert2";
//import Swal from '../../../../../../node_modules/sweetalert2/sweetalert2';

@Component({
  selector: "app-bookappointmentform",
  templateUrl: "./bookappointmentform.component.html",
  styleUrls: ["./bookappointmentform.component.css"]
})
export class BookappointmentformComponent implements OnInit {
  showPrice1 = false;
  showPrice2 = false;

  dateOfAppointment = "";
  selectTimeSlot = 0;
  doctor: Doctor;
  medicare: Medicare;
  defaultAgent: Agents;
  doctorId: number;
  medId: number;
  submitted = false;

  bookAppointmentForm: FormGroup;
  agent: Agents;

  patientId = 0;

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medicareService: MedicareService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,
    private agentService: AgentsService,
    private loginService: LoginServiceService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.bookAppointmentForm = this.formBuilder.group({
      dateOfAppointment: new FormControl("", [Validators.required]),
      selectTimeSlot: new FormControl("", [Validators.required])
    });

    this.patientId = +localStorage.getItem("userId");

    this.route.paramMap.subscribe(params => {
      this.doctorId = +params.get("docId");
      this.medId = +params.get("medId");
      console.log("DOCTOR ID " + this.doctorId);
      console.log("MEDICARE ID " + this.medId);
    });

    this.doctorService.getAllDoctors().subscribe((docs: Doctor[]) => {
      this.doctor = docs.find(
        (doctor: Doctor) => doctor.doctorId === this.doctorId
      );
      this.medicareService
        .getAllmedicareService()
        .subscribe((meds: Medicare[]) => {
          this.medicare = meds.find(
            (med: Medicare) => med.medicareServiceId === this.medId
          );
          this.agentService.getAgent(7235).subscribe((da: Agents) => {
            this.defaultAgent = da;
            console.log("MEDICARE " + this.medicare.medicareServiceId);
          });
        });
    });

    this.agentService.getAllAgentUrl().subscribe((agents: Agents[]) => {
      this.agent = this.randomAgent(agents);
    });
  }

  get f() {
    return this.bookAppointmentForm.controls;
  }

  book() {
    this.submitted = true;
    if (this.bookAppointmentForm.invalid) {
      return;
    }

    console.log(this.bookAppointmentForm.value);

    let appointment: Appointment = {
      dateOfAppointment: this.bookAppointmentForm.value["dateOfAppointment"],
      timeSlot: this.bookAppointmentForm.value["selectTimeSlot"],
      doctor: this.doctor,
      agent: this.defaultAgent,
      status: "pending",
      patientId: this.patientId
    };

    this.appointmentService.book(appointment).subscribe(res => {
      console.log("SUCCESS");

      Swal.fire(
        "Good job!",
        "Your appointment request has been sent successfully",
        "success"
      );

      this.router.navigateByUrl("/patient/home");
    });
  }

  bookWithAgent() {
    console.log("Random agent is " + this.agent.agentId);
    let appointment: Appointment = {
      dateOfAppointment: this.bookAppointmentForm.value["dateOfAppointment"],
      timeSlot: this.bookAppointmentForm.value["selectTimeSlot"],
      doctor: this.doctor,
      agent: this.agent,
      status: "pending",
      patientId: this.patientId
    };

    this.appointmentService.book(appointment).subscribe(res => {
      console.log("SUCCESS");
      Swal.fire(
        "Good job!",
        "Your appointment request has been sent successfully",
        "success"
      );
      this.router.navigateByUrl("/patient/home");
    });
  }

  randomAgent(arr) {
    let randAgent: Agents;
    randAgent = arr[Math.floor(Math.random() * arr.length)];
    while (randAgent.agentId === 7235) {
      randAgent = arr[Math.floor(Math.random() * arr.length)];
    }
    return randAgent;
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
