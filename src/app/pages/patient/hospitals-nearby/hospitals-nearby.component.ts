import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { $ } from 'protractor';
import { PatientService } from 'src/app/service/patient.service';

declare var $;

@Component({
  selector: 'app-hospitals-nearby',
  templateUrl: './hospitals-nearby.component.html',
  styleUrls: ['./hospitals-nearby.component.css']
})
export class HospitalsNearbyComponent implements OnInit {

  hospitals;
  filterHospitals;s
  constructor(private patientService:PatientService,private router:Router) { 
 
  }

  ngOnInit() {
    this.patientService.getHospitals().subscribe((data:any)=>{
      // console.log(data);
      this.filterHospitals = data;
      this.hospitals = data;
    });
  }

  filterMedi(eve){
    // this.hospitals = [];
    // this.hospitals = this.filterHospitals;
    if(eve.target.value == 'clear'){
      this.hospitals = this.filterHospitals;
    }
    else{
      this.hospitals = this.filterHospitals.filter(res=>{
        return res.departments.includes(eve.target.value)
      })
    }

    // console.log(this.filterHospitals);
  }
  updateLocation(location){
    console.log(location,'inside hospital nearby service');
    this.patientService.updateLocation(location);
    // $("#myModal").modal("show");
    this.router.navigateByUrl('patient/location');
  }
}
