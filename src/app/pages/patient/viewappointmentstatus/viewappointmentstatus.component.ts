import { AppModule } from "./../../../app.module";
import { Component, OnInit } from "@angular/core";
import { Appointment } from "src/app/model/appointment_model";
import { DoctorService } from "src/app/service/doctor.service";
import { Router } from "@angular/router";
import { AppointmentService } from "src/app/service/appointment.service";
import { LoginServiceService } from "src/app/service/login-service.service";
import Swal from "sweetalert2";
import { PatientService } from 'src/app/service/patient.service';

@Component({
  selector: "app-viewappointmentstatus",
  templateUrl: "./viewappointmentstatus.component.html",
  styleUrls: ["./viewappointmentstatus.component.css"],
})
export class ViewappointmentstatusComponent implements OnInit {
  appointments: Appointment[];
  patientId: number;
  currdate: Date;
  // isCurrentDateGreater = false;
  isDesc: boolean = true;
  column: string = "status";
  showRecommendation;
  // tslint:disable-next-line: max-line-length
  constructor(
    private docService: DoctorService,
    private router: Router,
    private patientService:PatientService,
    private appointmentService: AppointmentService,
    private loginservice: LoginServiceService
  ) {}
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
  ngOnInit() {
    this.currdate = new Date();
    this.patientService.getPatientAnalyticalData(localStorage.getItem("userId")).subscribe((data:any)=>{
      // console.log(data['dietExerciseRecommendations']);
      this.showRecommendation = data['dietExerciseRecommendations'];
    });
    this.patientId = +localStorage.getItem("userId");

    this.appointmentService
      .getPatientsDoctorAppointmentsUpcoming()
      .subscribe((res: Appointment[]) => {
        this.appointments = res;
      });
  }

  sendRecommendation() {
    Swal.fire("Thank You!!!", "Get Well Soon");
    this.router.navigateByUrl("/patient/home");
  }
}
