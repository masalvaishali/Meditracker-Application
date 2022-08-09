import { MessageService } from "src/app/service/message.service";
import { LoginServiceService } from "./../../../../service/login-service.service";

// import { Agents } from "./../../../../model/agents_model";
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
  FormControl,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Medicare } from "src/app/model/medicare_service_model";
import { Doctor } from "src/app/model/doctor_model";
import Swal from "sweetalert2";
import { map } from "rxjs/operators";
import { doctorAppointment } from "src/app/model/appointment_doctor_model";
//import Swal from '../../../../../../node_modules/sweetalert2/sweetalert2';

@Component({
  selector: "app-bookappointmentform",
  templateUrl: "./bookappointmentform.component.html",
  styleUrls: ["./bookappointmentform.component.css"],
})
export class BookappointmentformComponent implements OnInit {
  showPrice1 = false;
  showPrice2 = false;
  today;
  dateOfAppointment = "";
  selectTimeSlot = 1;
  doctor: Doctor;
  medicare: Medicare;
  // defaultAgent: Agents;
  doctorId: number;
  medId: number;
  submitted = false;
  docName;
  timeslots;
  bookAppointmentForm: FormGroup;
  dateEntered = false;
  // agent: Agents;

  patientId = 0;

  AppointmentDetailsOfDoctor;
  timeslot = [
    {
      id: 1,
      time: "10am - 12pm",
      disabled: false,
    },
    {
      id: 2,
      time: "2pm - 4pm",
      disabled: false,
    },
    {
      id: 3,
      time: "6pm - 9pm",
      disabled: false,
    },
  ];

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private medicareService: MedicareService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private route: ActivatedRoute,

    private loginService: LoginServiceService,
    private messageService: MessageService
  ) {
    this.today = new Date().toISOString().split("T")[0];
  }

  ngOnInit() {
    this.bookAppointmentForm = this.formBuilder.group({
      dateOfAppointment: new FormControl("", [Validators.required]),
      selectTimeSlot: new FormControl("1", [Validators.required]),
    });

    this.patientId = +localStorage.getItem("userId");

    this.route.paramMap.subscribe((params) => {
      this.doctorId = +params.get("docId");
      this.medId = +params.get("medId");
      // console.log("DOCTOR ID " + this.doctorId);
      // console.log("MEDICARE ID " + this.medId);
    });

    this.doctorService
      .getAllDoctorsByMedicareService(this.medId)
      .subscribe((docs) => {
        this.doctor = docs["listOFDoctors"].find(
          (doctor: Doctor) => doctor.doctorId === this.doctorId
        );
        this.medicareService
          .getAllmedicareService()
          .subscribe((meds: Medicare[]) => {
            this.medicare = meds.find(
              (med: Medicare) => med.medicareServiceId === this.medId
            );
          });
      });

    this.patientService
      .getAppointmentsForTheDoctor(this.doctorId)
      .subscribe((data: doctorAppointment[]) => {
        this.AppointmentDetailsOfDoctor = data;
        //  this.AppointmentDetailsOfDoctor = this.AppointmentDetailsOfDoctor.map(res => res[0]);
      });
    setTimeout(() => {
      console.log(this.AppointmentDetailsOfDoctor, "before filtering");
    }, 300);
  }

  get f() {
    return this.bookAppointmentForm.controls;
  }
  toggleTheSlotSelection(event) {
    if (event.target.value) {
      this.dateEntered = true;
      this.AppointmentDetailsOfDoctor = this.AppointmentDetailsOfDoctor.filter(
        (o) => o.appointmentDate == event.target.value && o.status == "approved"
      );
      if (this.AppointmentDetailsOfDoctor) {
        this.timeslots = this.AppointmentDetailsOfDoctor.map(
          (ele) => ele.timeSlotId
        );
      }
      if (this.timeslots.length == 3) {
        Swal.fire(
          "All the TimeSlots were Booked",
          "Kindly Book Appointment for another Data"
        );
      }
      this.AppointmentDetailsOfDoctor.forEach((element) => {
        this.timeslot[element.timeSlotId - 1].disabled = true;
      });
    }
  }

  book() {
    this.submitted = true;
    if (this.bookAppointmentForm.invalid) {
      return;
    }

    // console.log(this.bookAppointmentForm.value);
    let appointment = {
      appointmentDate: this.bookAppointmentForm.value["dateOfAppointment"],
      timeSlotId: this.bookAppointmentForm.value["selectTimeSlot"],
      doctorId: this.doctorId,
      patientName: localStorage.getItem("username"),
      doctorName: this.doctor.firstName + this.doctor.lastName,
      medicareService: this.medicare.medicareService,
      consultationFee: this.medicare.amount,
      isFeedbackProvided: false,
      // agent: this.agent,
      appointmentId: null,
      status: "pending",
      patientId: this.patientId,
    };
    console.log(appointment.timeSlotId);

    this.appointmentService.book(appointment).subscribe((res) => {
      Swal.fire(
        "Good job!",
        "Your appointment request has been sent successfully",
        "success"
      );

      this.router.navigateByUrl("/patient/home");
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
