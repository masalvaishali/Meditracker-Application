import { LoginServiceService } from "./../../../service/login-service.service";
import { FeedbackService } from "./../../../service/feedback.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { StarRatingComponent } from "ng-starrating";
import { Feedback } from "src/app/model/feedback_model";
import Swal from "sweetalert2";

@Component({
  selector: "app-givefeedback",
  templateUrl: "./givefeedback.component.html",
  styleUrls: ["./givefeedback.component.css"]
})
export class GivefeedbackComponent implements OnInit {
  reportId = 0;
  ratings: number[] = [];
  rate1 = 0;
  rate2 = 0;
  rate3 = 0;
  rate4 = 0;
  rate5 = 0;
  rate6 = 0;
  rate7 = 0;
  rate8 = 0;

  constructor(
    private router: Router,
    private feedbackService: FeedbackService,
    private route: ActivatedRoute,
    private loginService: LoginServiceService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.reportId = +params.get("id");
    });
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
    console.log(this.rate1);
    console.log(this.rate2);
    console.log(this.rate3);
    console.log(this.rate4);
    console.log(this.rate5);
    console.log(this.rate6);
    console.log(this.rate7);
    console.log(this.rate8);

    let feedback: Feedback = {
      reportId: this.reportId,
      patientId: +localStorage.getItem("userId"),
      rating1: this.rate1,
      rating2: this.rate2,
      rating3: this.rate3,
      rating4: this.rate4,
      rating5: this.rate5,
      rating6: this.rate6,
      rating7: this.rate7,
      rating8: this.rate8
    };

    this.feedbackService.sendFeedback(feedback).subscribe(res => {
      Swal.fire("Good job!", "Thanks for your valuable feedback.", "success");
      this.router.navigateByUrl("/patient/home");
    });
  }
}
