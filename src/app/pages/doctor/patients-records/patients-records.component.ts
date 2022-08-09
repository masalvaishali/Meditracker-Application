import { Component, OnInit } from '@angular/core';
import { DoctorService } from './../../../service/doctor.service';
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-patients-records',
  templateUrl: './patients-records.component.html',
  styleUrls: ['./patients-records.component.css']
})
export class PatientsRecordsComponent implements OnInit {

  records;
  constructor(private docService: DoctorService, private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
     this.docService.getDoctorPatRec(+params.get('id')).subscribe((res) => {
      //  console.log(res);
      this.records = res;
    });
    })
   }

  ngOnInit() {
  }

  download(fileId){
    let filename = 'download';
    this.docService.downloadRecord(fileId).subscribe(response =>{
      // this.showLink = res;
      let dataType = response['type'];
      let binaryData = [];
      binaryData.push(response);
      let downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
      if (filename)
          downloadLink.setAttribute('download', filename);
      document.body.appendChild(downloadLink);
      downloadLink.click();
    });
  }
}
