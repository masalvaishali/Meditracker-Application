import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/service/patient.service";

declare var $;

@Component({
  selector: "app-patient-records",
  templateUrl: "./patient-records.component.html",
  styleUrls: ["./patient-records.component.css"],
})
export class PatientRecordsComponent implements OnInit {
  file: File = null;
  myFiles: string[] = [];
  records;
  showLink;
  categoryType = "Heart";
  doctorName;
  procedureDate;
  severityType = "Severe";
  procedureType = "OPD";
  severity = ["Severe", "High", "Moderate", "Low", "Normal"];
  catogories = ["Heart", "Liver", "Stomach", "Skin"];
  ProcedureType = ["OPD", "Hospitalization", "Surgery"];
  constructor(private patientService: PatientService) {
    this.updateRecords();
  }
  // obj;

  ngOnInit() {}

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
  // On file Select
  onChange(event) {
    // this.file = event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  updateRecords() {
    this.patientService
      .updateRecord(localStorage.getItem("userId"))
      .subscribe((res) => {
        this.records = res;
        // console.log(res);
      });
  }

  download(fileId) {
    let filename = "download";
    this.patientService.downloadRecord(fileId).subscribe((response) => {
      // this.showLink = res;
      let dataType = response["type"];
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(
        new Blob(binaryData, { type: dataType })
      );
      if (filename) downloadLink.setAttribute("download", filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }

  // OnClick of button Upload
  onUpload() {
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
            consultingDocName: this.doctorName,
            conditionCategory: this.categoryType,
            procedureDate: this.procedureDate,
            procedureType: this.procedureType,
            patientId: localStorage.getItem("userId"),
            severity: this.severityType,
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    this.patientService.uploadRecords(formData).subscribe((res) => {
      console.log(res);
    });
    if ((this.severityType = "Severe")) {
      this.patientService
        .insuranceEmail({ condition: "any" })
        .subscribe((res) => {
          console.log(res);
        });
    }

    $("#myModal").modal("hide");
    setTimeout(() => {
      this.updateRecords();
    }, 1000);
  }

}
