import { Router } from '@angular/router';
import { Doctor } from 'src/app/model/doctor_model';
import { DoctorService } from './../../../service/doctor.service';
import { Component, OnInit } from '@angular/core';
import { Medicare } from 'src/app/model/medicare_service_model';
import { MedicareService } from 'src/app/service/medicare.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.css']
})
export class BookappointmentComponent implements OnInit {

  medicare: Medicare[] = [];
  constructor(private medicareService: MedicareService, private docService: DoctorService,private router: Router) { }

  ngOnInit() {
    this.medicareService.getAllmedicareService().subscribe((res: Medicare[]) => {
      this.medicare = res;
      console.log(this.medicare)
    })
  }


  viewMore(event, id) {
    let md: Medicare = this.medicare.find(res => res.medicareServiceId === id);
    Swal.fire(md.medicareService, md.serviceDescription, "info");  }

  viewDoctors(id) {
    this.router.navigateByUrl('/patient/bookappointment/choosedoctors/'+id)
  
  }
}
