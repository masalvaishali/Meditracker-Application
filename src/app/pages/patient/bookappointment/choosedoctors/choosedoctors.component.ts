import { Medicare } from 'src/app/model/medicare_service_model';
import { Router } from '@angular/router';
import { DoctorService } from './../../../../service/doctor.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Doctor } from 'src/app/model/doctor_model';
import { MedicareService } from 'src/app/service/medicare.service';

@Component({
  selector: 'app-choosedoctors',
  templateUrl: './choosedoctors.component.html',
  styleUrls: ['./choosedoctors.component.css']
})
export class ChoosedoctorsComponent implements OnInit {

  doctors: Doctor[];
  id: number;
  medicare: Medicare[];

  // tslint:disable-next-line: max-line-length
  constructor(private medicareService: MedicareService, private docService: DoctorService, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.medicareService.getAllmedicareService()
        .toPromise().then((medicareServices: Medicare[]) => {
          this.docService.getAllDoctorsByMedicareService(medicareServices.find((medicare) => medicare.medicareServiceId === +params.get('id'))).subscribe((docs: Doctor[]) => this.doctors = docs);
        })
    });

  }

  bookNow(doc,medicare){
    this.router.navigateByUrl("/patient/bookappointment/bookappointmentform/"+medicare.medicareServiceId+"/"+doc.doctorId);
  }

}
