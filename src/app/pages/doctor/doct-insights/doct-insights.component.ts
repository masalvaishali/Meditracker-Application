import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart, Point, registerables } from "chart.js";
import { doctorRating } from "src/app/model/doctorRating_model";
import { DoctorService } from "src/app/service/doctor.service";
Chart.register(...registerables);
@Component({
  selector: "app-doct-insights",
  templateUrl: "./doct-insights.component.html",
  styleUrls: ["./doct-insights.component.css"],
})
export class DoctInsightsComponent implements OnInit {
  @ViewChild("chart", { static: true })
  private chart: Chart;
  private doctorRating: doctorRating;
  constructor(private docService: DoctorService) {}

  ngOnInit() {
    this.docService
      .getDoctor(
        localStorage.getItem("userId"),
        localStorage.getItem("jwt_token")
      )
      .subscribe((res: any) => {
        this.doctorRating = res.rating;
        console.log(this.doctorRating.AdmissionProcess, "inside rating thing");
      });
    setTimeout(() => {
      this.getChartData();
    }, 100);
  }
  getChartData() {
    const canvas = <HTMLCanvasElement>document.getElementById("myChart");
    const ctx = canvas.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Admission Process",
          "Behaviour of staff",
          "Doctor's Experience",
          "Hygine and Cleanliness",
          "Laboratory facilities",
          "Medical services at hospital",
          "Service of attending nurse",
          "Recommendation",
        ],
        datasets: [
          {
            label: "Rating",
            data: [
              this.doctorRating.AdmissionProcess,
              this.doctorRating.Behaviourofstaff,
              this.doctorRating["Doctor'sExperience"],
              this.doctorRating.HygineandCleanliness,
              this.doctorRating.Laboratoryfacilities,
              this.doctorRating.Medicalservicesathospital,
              this.doctorRating.Serviceofattendingnurse,
              this.doctorRating[
                "Wouldyoureferthisdoctortoanyotherknownperson?"
              ],
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
    });
  }
}
