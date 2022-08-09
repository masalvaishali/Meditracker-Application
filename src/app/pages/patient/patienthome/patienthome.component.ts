import { Component, OnInit } from '@angular/core';
declare var $;
@Component({
  selector: 'app-patienthome',
  templateUrl: './patienthome.component.html',
  styleUrls: ['./patienthome.component.css']
})
export class PatienthomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

 openModel(){
   $("#myModal").modal("show");
 }
}
