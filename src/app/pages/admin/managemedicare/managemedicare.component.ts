import { Medicare } from "src/app/model/medicare_service_model";
import { MedicareService } from "./../../../service/medicare.service";
import { Component, OnInit } from "@angular/core";
import Swal from "sweetalert2";

@Component({
  selector: "app-managemedicare",
  templateUrl: "./managemedicare.component.html",
  styleUrls: ["./managemedicare.component.css"]
})
export class ManagemedicareComponent implements OnInit {
  medicare: Medicare[] = [];
  constructor(private medicareService: MedicareService) {}

  ngOnInit() {
    this.medicareService
      .getAllmedicareService()
      .subscribe((res: Medicare[]) => {
        this.medicare = res;
        console.log(this.medicare);
      });
  }

  viewMore(event, id) {
    let md: Medicare = this.medicare.find(res => res.medicareServiceId === id);
    Swal.fire(md.medicareService, md.serviceDescription, "info");
  }
}
