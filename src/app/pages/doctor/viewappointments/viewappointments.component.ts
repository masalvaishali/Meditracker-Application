import { MessageService } from "src/app/service/message.service";

import { Appointment } from "./../../../model/appointment_model";
import { Router } from "@angular/router";
import { DoctorService } from "./../../../service/doctor.service";
import { AppointmentService } from "./../../../service/appointment.service";
import { LoginServiceService } from "./../../../service/login-service.service";
import { Component, OnInit } from "@angular/core";
import { Route } from "@angular/compiler/src/core";
import { Doctor } from "src/app/model/doctor_model";
import { Patient } from "src/app/model/patient_model";
import { PatientService } from "src/app/service/patient.service";
import Swal from "sweetalert2";

declare var $;

@Component({
  selector: "app-viewappointments",
  templateUrl: "./viewappointments.component.html",
  styleUrls: ["./viewappointments.component.css"],
})
export class ViewappointmentsComponent implements OnInit {
  isDesc: boolean = true;
  column: string = "status";
  file: File = null;
  myFiles: string[] = [];
  appointments: Appointment[];
  patients = [];
  doctor: Doctor;
  categoryType = "heart";
  doctorName;
  procedureDate;
  procedureType = "OPD";
  catogories = ["Heart", "Liver", "Stomach", "Skin"];
  severityType = "Severe";
  severity = ["Severe", "High", "Moderate", "Low", "Normal"];
  ProcedureType = ["OPD", "Hospitalization", "surgery"];
  // tslint:disable-next-line: max-line-length
  constructor(
    private loginservice: LoginServiceService,
    private appointmentservice: AppointmentService,
    private docService: DoctorService,
    private patientService: PatientService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.docService
      .getDoctor(
        +localStorage.getItem("userId"),
        localStorage.getItem("jwt_token")
      )
      .subscribe((res: Doctor) => {
        this.doctor = res;
        this.appointmentservice
          .getByDoctorUpcoming(this.doctor)
          .subscribe((res: Appointment[]) => {
            this.appointments = res;
            // this.appointments.forEach((app) => {
            //   this.patients.push(app);
            // console.log(this.patients[0],'inside doctor');
            // });
          });
      });
  }
  openModal() {
    $("#myModal").modal("show");
    this.doctorName = "";
    this.myFiles = [];
    this.file = null;
    $("#fileControl").val("");
    this.categoryType = "Heart";
    this.procedureDate = new Date();
    this.severityType = "Severe";
    this.procedureType = "OPD";
  }
  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    this.column = property;
    let direction = this.isDesc ? 1 : -1;
    // let makeArray = [];
    // this.products.forEach(element => {
    this.appointments.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
  getPatRec(id) {
    // this.docService.getDoctorPatRec(id).subscribe((res: Doctor) => {
    // });
  }
  closeRequest(appointment: Appointment) {
    appointment.status = "closed";
    this.appointmentservice.updateAppointmentApproval(appointment).subscribe(
      (res) => {
        Swal.fire(
          "Good job!",
          "This request is Closed Successfully.",
          "success"
        );
      },
      (err) => {
        Swal.fire("Invalid", "There was error with your request.", "error");
      }
    );
  }

  // On file Select
  onChange(event) {
    // this.file = event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    // event.target.value = "";
    // this.obj =
    //   {
    //     "patientRecord": {
    //       patientId: 1
    //     },
    //     "files": [
    //       event.target.files[0]
    //     ]
    //   };
  }

  // OnClick of button Upload
  onUpload(app) {
    // this.loading = !this.loading;
    // console.log(this.obj);
    const formData = new FormData();
    // formData.append('files', this.file, this.file.name);
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("files", this.myFiles[i], this.myFiles[i]["name"]);
    }

    formData.append(
      "patientRecord",
      new Blob(
        [
          JSON.stringify({
            patientId: app.patientId,
            consultingDocName: this.doctorName,
            conditionCategory: this.categoryType,
            procedureDate: this.procedureDate,
            procedureType: this.procedureType,
            severity: this.severityType,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    this.docService.uploadRecords(formData).subscribe(
      (res) => {
        // console.log(res);
      },
      (err) => {
        Swal.fire("Good job!", "Uploaded Successfully.", "success");
      }
    );

    if ((this.severityType = "Severe")) {
      this.patientService
        .insurancedrEmail({ condition: "any" },app.patientId)
        .subscribe((res) => {
          console.log(res);
        });
    }
    //         if (typeof (event) === 'object') {

    //             Short link via api response
    //             this.shortLink = event.link;

    //             this.loading = false; // Flag variable
    //         }
    //     }
    $("#myModal").modal("hide");
    // this.updateRecords();
  }

  ApproveOrRejectPatient(event, appointment: Appointment) {
    console.log(appointment, "from approvething");
    if (event.target.checked) {
      appointment.status = "approved";
      console.log("approved");
      // this.patientService.getPatient(appointment.patientId).subscribe((p: Patient) => {
      //   this.messageService.sendSMS("Hi, " + p.firstName + ". Your appointment has been approved by Dr. " + this.doctor.firstName, p.contactNumber).subscribe((res) => {
      //     console.log(res);
      //   });
      // });
      this.appointmentservice.updateAppointmentApproval(appointment).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          Swal.fire("Invalid", "There was error with your request.", "error");
        }
      );
    } else {
      appointment.status = "rejected";
      this.appointmentservice.updateAppointmentApproval(appointment).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          Swal.fire("Invalid", "There was error with your request.", "error");
        }
      );
    }
  }

  ApprovePatient() {}
}
