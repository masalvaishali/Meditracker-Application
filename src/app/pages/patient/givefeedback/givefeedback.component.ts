import { LoginServiceService } from "./../../../service/login-service.service";
import { FeedbackService } from "./../../../service/feedback.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { StarRatingComponent } from "ng-starrating";
import { Feedback } from "src/app/model/feedback_model";
import { AppointmentService } from './../../../service/appointment.service';

import Swal from "sweetalert2";

@Component({
  selector: "app-givefeedback",
  templateUrl: "./givefeedback.component.html",
  styleUrls: ["./givefeedback.component.css"],
})
export class GivefeedbackComponent implements OnInit {
  doctorId = 0;
  ratings: number[] = [];
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  rate6 = 0;
  rate7 = 0;
  rate8 = 0;
  appointment;
  appointmentId;
  appointments;
  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private appointmentservice: AppointmentService,
    private loginService: LoginServiceService
  ) {
    this.route.paramMap.subscribe(params => {
      this.appointmentId = +params.get("id");
    });
    this.appointmentservice
      .getPatientsDoctorAppointmentsUpcoming()
      .subscribe((res) => {
        this.appointments = res;
        this.appointment = this.appointments.filter(
         (app)=> app.appointmentId == this.appointmentId
        ); 
     
      });
  }

  ngOnInit() {
   
  }

  onRate1(event) {
    this.rate1 = event.newValue;
  }
  onRate2(event) {
    this.rate2 = event.newValue;
  }
  onRate3(event) {
    this.rate3 = event.newValue;
  }
  onRate4(event) {
    this.rate4 = event.newValue;
  }
  onRate5(event) {
    this.rate5 = event.newValue;
  }
  onRate6(event) {
    this.rate6 = event.newValue;
  }
  onRate7(event) {
    this.rate7 = event.newValue;
  }
  onRate8(event) {
    this.rate8 = event.newValue;
  }

  sendFeedback() {
    this.appointment['isFeedbackProvided'] = true;
    // console.log(this.appointment);
    this.appointmentservice.updateAppointmentApproval(this.appointment).subscribe((res) => {console.log(res)},
      (err)=>{
       
      });

    let feedback = {
      "doctorId": this.appointment['doctorId'],
      "feedback": [
        {
          "name": "Medical services at hospital",
          "value": this.rate1
        },
        {
          "name": "Laboratory facilities",
          "value": this.rate2
        },
        {
          "name": "Hygine and Cleanliness",
          "value": this.rate3
        },
        {
          "name": "Behaviour of staff",
          "value": this.rate4
        },
        {
          "name": "Service of attending nurse",
          "value": this.rate5
        },
        {
          "name": "Admission Process",
          "value": this.rate6
        }, 
        {
          "name": "Doctor's Experience",
          "value": this.rate7
        },  
         {
          "name": "Would you refer this doctor to any other known person ?",
          "value": this.rate8
        },
    
      ]
    }

    this.feedbackService.sendFeedback(feedback).subscribe(res => {
      Swal.fire("Good job!", "Thanks for your valuable feedback.", "success");
      this.router.navigateByUrl("/patient/home");
    },
    err=>{
      Swal.fire("Good job!", "Thanks for your valuable feedback.", "success");
      this.router.navigateByUrl("/patient/home");
    });
  }
}
