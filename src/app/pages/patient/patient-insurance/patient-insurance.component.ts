import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/app/service/patient.service";

declare var $;
@Component({
  selector: "app-patient-insurance",
  templateUrl: "./patient-insurance.component.html",
  styleUrls: ["./patient-insurance.component.css"],
})
export class PatientInsuranceComponent implements OnInit {
  file: File = null;
  myFiles: string[] = [];
  records;

  hasData = false;
  InsuranceData;
  InsuranceProviderEmail;
  InsuranceProvider;
  InsuranceNumber;
  constructor(private patientService: PatientService) {}

  ngOnInit() {
    this.hasDataMethod();
    // this.emailDocument();
  }
  hasDataMethod() {
    setTimeout(() => {
      this.patientService
        .getInsuranceDetails(+localStorage.getItem("userId"))
        .subscribe((data) => {
          if (data) {
            this.hasData = true;
            this.InsuranceData = data;
          } else this.hasData = false;
        });
    }, 1000);
  }
  onChange(event) {
    // this.file = event.target.files[0];
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
    // event.target.value = "";
  }
  submit() {
    this.hasDataMethod();
    const formData = new FormData();
    // formData.append('files', this.file, this.file.name);
    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append("file", this.myFiles[i], this.myFiles[i]["name"]);
    }

    formData.append(
      "insurance",
      new Blob(
        [
          JSON.stringify({
            insuranceNumber: this.InsuranceNumber,
            insuranceProvider: this.InsuranceProvider,
            insuranceProviderEmail: this.InsuranceProviderEmail,
            patientId: localStorage.getItem("userId"),
          }),
        ],
        {
          type: "application/json",
        }
      )
    );
    this.patientService.uploadInsurance(formData).subscribe((res) => {
      console.log(res);
    });

    $("#myModal").modal("hide");
    this.InsuranceNumber = '';

    this.InsuranceProvider = '';

      this.InsuranceProviderEmail = '';
  }
}
