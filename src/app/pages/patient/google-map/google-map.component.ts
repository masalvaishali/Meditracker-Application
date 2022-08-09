import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/service/patient.service';


@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit {
  zoom =10;
  dir = undefined;
  destinationLat;
  destinationLong;
  constructor(private patientService:PatientService) { }
  lat: number = 18.6590835;
  lng: number = 73.79571;
  ngOnInit() {
    setTimeout(()=>{
      this.destinationLat= (+this.patientService.latitude);
      this.destinationLong = (+this.patientService.longitude);
    },3000) 
		setTimeout(()=>{
      console.log(this.destinationLat,this.destinationLong,'inside timeout');
			this.dir = {
				origin: { lat: 18.6590835, lng:73.79571},
				destination: { lat: this.destinationLat, lng: this.destinationLong }
			  }
		},3000)
  }

  
}
