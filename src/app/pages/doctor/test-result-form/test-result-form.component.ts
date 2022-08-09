import { MedicalTest } from './../../../model/medical_test';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MedicareService } from 'src/app/service/medicare.service';
import { Medicare } from 'src/app/model/medicare_service_model';
import { Patient } from 'src/app/model/patient_model';
import { Doctor } from 'src/app/model/doctor_model';
import { Agents } from 'src/app/model/agents_model';
import { LoginServiceService } from 'src/app/service/login-service.service';
import { AppointmentService } from 'src/app/service/appointment.service';
import { DoctorService } from 'src/app/service/doctor.service';
import { PatientService } from 'src/app/service/patient.service';
import { Appointment } from 'src/app/model/appointment_model';

@Component({
  selector: 'app-test-result-form',
  templateUrl: './test-result-form.component.html',
  styleUrls: ['./test-result-form.component.css']
})
export class TestResultFormComponent implements OnInit {


  patient: Patient;
  doctor: Doctor;
  agent: Agents;
  testResultDate: Date = new Date();
  testName1 = '';
  testName2 = '';
  testName3 = '';
  testName4 = '';
  testName5 = '';
  testName6 = '';
  actualValue1 = '';
  actualValue2 = '';
  actualValue3 = '';
  actualValue4 = '';
  actualValue5 = '';
  actualValue6 = '';
  normalRange1 = '';
  normalRange2 = '';
  normalRange3 = '';
  normalRange4 = '';
  normalRange5 = '';
  normalRange6 = '';
  doctorComments = '';
  otherInfo = '';

  appId = '';
  appointment: Appointment;
  submitted = false;

  updateTestResult: FormGroup;

  // tslint:disable-next-line: max-line-length
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private medicareService: MedicareService, private loginservice: LoginServiceService, private appointmentservice: AppointmentService, private docService: DoctorService, private patientService: PatientService) { }


  ngOnInit() {




    this.route.paramMap.subscribe(params => {
      this.appId = params.get('id');
      console.log(this.appId);
      this.appointmentservice.getAppointment(+params.get('id')).subscribe((app: Appointment) => {
        this.appointment = app;
        console.log(this.appointment)
        this.doctor = app.doctor;
        this.agent = app.agent;
        this.patientService.getPatient(app.patientId).subscribe((patient: Patient) => {
          this.patient = patient;
        })
      })
    });

    this.updateTestResult = this.formBuilder.group(
      {
        testName1: new FormControl(this.testName1, [
          Validators.required,
          Validators.minLength(2)
        ]),
        testName2: new FormControl(this.testName2, [
          Validators.minLength(2)
        ]),
        testName3: new FormControl(this.testName3, [
          Validators.minLength(2)
        ]),
        testName4: new FormControl(this.testName4, [
          Validators.minLength(2)
        ]),
        testName5: new FormControl(this.testName5, [
          Validators.minLength(2)
        ]),
        testName6: new FormControl(this.testName6, [
          Validators.minLength(2)
        ]),
        actualValue1: new FormControl(this.actualValue1, [
          Validators.required,
          Validators.minLength(2)
        ]),
        actualValue2: new FormControl(this.actualValue2, [
          Validators.minLength(2)
        ]),
        actualValue3: new FormControl(this.actualValue3, [
          Validators.minLength(2)
        ]),
        actualValue4: new FormControl(this.actualValue4, [
          Validators.minLength(2)
        ]),
        actualValue5: new FormControl(this.actualValue5, [
          Validators.minLength(2)
        ]),
        actualValue6: new FormControl(this.actualValue6, [
          Validators.minLength(2)
        ]),
        normalRange1: new FormControl(this.normalRange1, [
          Validators.required,
          Validators.minLength(2)
        ]),
        normalRange2: new FormControl(this.normalRange2, [
          Validators.minLength(2)
        ]),
        normalRange3: new FormControl(this.normalRange3, [
          Validators.minLength(2)
        ]),
        normalRange4: new FormControl(this.normalRange4, [
          Validators.minLength(2)
        ]),
        normalRange5: new FormControl(this.normalRange5, [
          Validators.minLength(2)
        ]),
        normalRange6: new FormControl(this.normalRange6, [
          Validators.minLength(2)
        ]),
        doctorComments: new FormControl(this.doctorComments, [
          Validators.required,
          Validators.minLength(4)
        ]),
        otherInfo: new FormControl(this.otherInfo, [
          Validators.required,
          Validators.minLength(4)
        ]),


      },
    );
  }

  get f() { return this.updateTestResult.controls; }


  onSubmit() {
    this.submitted = true;
    if (this.updateTestResult.invalid) {
      return;
    }

    console.log(this.updateTestResult.value);





    let medicalTest: MedicalTest = {
      reportId: 0,
      appointmentId: this.appId,
      patient: this.patient,
      agent: this.agent,
      doctor: this.doctor,
      diagName1: this.updateTestResult.value.testName1,
      diagName2: this.updateTestResult.value.testName2,
      diagName3: this.updateTestResult.value.testName3,
      diagName4: this.updateTestResult.value.testName4,
      diagName5: this.updateTestResult.value.testName5,
      diagName6: this.updateTestResult.value.testName6,

      diagActualValue1: this.updateTestResult.value.actualValue1,
      diagActualValue2: this.updateTestResult.value.actualValue2,
      diagActualValue3: this.updateTestResult.value.actualValue3,
      diagActualValue4: this.updateTestResult.value.actualValue4,
      diagActualValue5: this.updateTestResult.value.actualValue5,
      diagActualValue6: this.updateTestResult.value.actualValue6,

      diagNormalRange1: this.updateTestResult.value.normalRange1,
      diagNormalRange2: this.updateTestResult.value.normalRange2,
      diagNormalRange3: this.updateTestResult.value.normalRange3,
      diagNormalRange4: this.updateTestResult.value.normalRange4,
      diagNormalRange5: this.updateTestResult.value.normalRange5,
      diagNormalRange6: this.updateTestResult.value.normalRange6,

      doctorComments: this.updateTestResult.value.doctorComments,
      otherInfo: this.updateTestResult.value.otherInfo,
      testResultDate: new Date(),



    };

    console.log(medicalTest.doctorComments + " " + medicalTest.otherInfo)

    this.appointment.status = 'completed';


    this.docService.updateTestResult(medicalTest).subscribe((res) => {
      this.appointmentservice.updateAppointmentApproval(this.appointment).subscribe((res) => {
        console.log("SUCCESS");
        this.router.navigateByUrl('/doctor/testresults');
      })
    });


  }



}
