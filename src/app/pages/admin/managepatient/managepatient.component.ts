import { MessageService } from './../../../service/message.service';
import { PatientService } from './../../../service/patient.service';
import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient_model';

@Component({
  selector: 'app-managepatient',
  templateUrl: './managepatient.component.html',
  styleUrls: ['./managepatient.component.css']
})
export class ManagepatientComponent implements OnInit {

  patients: Patient[] = [];


  constructor(private patientService: PatientService, private messageService: MessageService) { }

  ngOnInit() {
    this.patientService.getAllPatients().subscribe((res: Patient[]) => {
      this.patients = res;
    });
  }
  ApproveOrRejectPatient(event, patient: Patient) {
    if (event.target.checked) {
      patient.approve = true;
      this.messageService.sendSMS("Hi, " + patient.firstName + ". You are approved by the admin. You can now sign in to Clinix. ", patient.contactNumber).subscribe((res) => {
        console.log(res);
      });
      this.patientService.updatePatientApproval(patient).subscribe((res) => console.log(res));
    } else {
      patient.approve = false;
      this.patientService.updatePatientApproval(patient).subscribe((res) => console.log(res));
    }
  }

}
