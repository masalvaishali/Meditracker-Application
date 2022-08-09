import { PatientService } from "src/app/service/patient.service";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";
//import { marker } from "src/app/model/appointment_model";
import { Router } from "@angular/router";

@Component({
  selector: "app-ambulances-nearby",
  templateUrl: "./ambulances-nearby.component.html",
  styleUrls: ["./ambulances-nearby.component.css"],
})
export class AmbulancesNearbyComponent implements OnInit {

  ambBooked: number;
  hospitals;
  filterHospitals;
  ambDetails;
  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.patientService.getHospitals().subscribe((data: any) => {
      // console.log(data);
      this.filterHospitals = data;
      this.hospitals = data;
    });
  }

  bookambulance(id, i) {
    this.patientService.bookAmbulance(id).subscribe(
      (res) => {
        this.ambBooked = i;

        this.patientService
          .insuranceEmail({ condition: "hospital" })
          .subscribe((res) => {
            console.log(res);
          });

        this.hospitals[i]["numberOfAmbulance"] =
          this.hospitals[i]["numberOfAmbulance"] - 1;
        this.ambDetails = res;
        Swal.fire(
          "We are reaching you shortly.",
          "Your Ambulance is booked successfully",
          "success"
        );
      },
      (err) => {
        Swal.fire("Sorry", "All Ambulances are busy.", "error");
      }
    );
  }

  checkambulance() {}

  cancelambulance(id, i) {
    this.patientService
      .cancelAmbulance(id, this.ambDetails["ambulance"]["ambulanceNo"])
      .subscribe((res) => {
        this.hospitals[i]["numberOfAmbulance"] =
        this.hospitals[i]["numberOfAmbulance"] + 1;
        Swal.fire(
          "Cancelled!",
          "Your Ambulance is cancelled successfully",
          "success"
        );
      // });
      },
      (err)=>{
        this.hospitals[i]["numberOfAmbulance"] =
        this.hospitals[i]["numberOfAmbulance"] + 1;
        Swal.fire(
          "Cancelled!",
          "Your Ambulance is cancelled successfully",
          "success"
        );
      });
  }

  filterMedi(eve) {
    
    this.hospitals = this.filterHospitals.filter((res) => {
      return res.departments.includes(eve.target.value);
    });

  }
}
