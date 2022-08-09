import { Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import { Chart,Point,registerables } from 'chart.js';
import { casesByConditions } from 'src/app/model/casesRecord_model';
import { RecordsSeverity } from 'src/app/model/recordedCase';
import { PatientService } from 'src/app/service/patient.service';
import { ChartType, ChartOptions } from 'chart.js';
import { costSpend } from 'src/app/model/CostSpend_model';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-features',
  templateUrl: './analytics-features.component.html',
  styleUrls: ['./analytics-features.component.css']
})
export class AnalyticsFeaturesComponent implements OnInit {
  @ViewChild('chart', {static:true})
  @ViewChild('mychart', {static:true})
  private chartRef: ElementRef;
  private chart: Chart;
  private mychart: Chart;
  showRecommendation;
  private SeverityRecord:RecordsSeverity;
  private TotalCases:casesByConditions;
  private costSpend:costSpend;
  private AnalyticRecord:any ={};
  constructor(private patientService:PatientService) {}

  ngOnInit() {
    this.patientService.getPatientAnalyticalData(localStorage.getItem("userId")).subscribe((data:any)=>{
      this.AnalyticRecord.dietExerciseRecommendations = data.dietExerciseRecommendations;
      this.AnalyticRecord.expenseInsights=data.expenseInsights;
      this.AnalyticRecord.recordsInsights = data.recordsInsights;
      this.SeverityRecord = this.AnalyticRecord.recordsInsights.recordedCases;
      this.TotalCases = this.AnalyticRecord.recordsInsights.casesByConditions;
      this.costSpend = this.AnalyticRecord.expenseInsights.expenseByMedicareService;
      this.showRecommendation = data['dietExerciseRecommendations'];

        this.getChartData();
    })

  }
  getChartData(){
    //barchart 
    const canvas = <HTMLCanvasElement> document.getElementById('myChart');
    const ctx = canvas.getContext('2d');
    console.log(this.SeverityRecord.high);
    const chart  = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ["severe","high","moderate","low","normal"],
          datasets: [{
              label: 'Number of Cases',
              data:[this.SeverityRecord.severe,this.SeverityRecord.high,this.SeverityRecord.moderate,this.SeverityRecord.low,this.SeverityRecord.normal],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      },
  });

  //2nd chart

  const canvas1 = <HTMLCanvasElement> document.getElementById('chart');
  const ctx1 = canvas1.getContext('2d');
  const mychart = new Chart(ctx1, {
    type: 'line',
    data: {
        labels: ["Heart","Stomach","liver","skin"],
        datasets: [{
            label: 'Number of Severeity Cases',
            data: [this.TotalCases.Heart,this.TotalCases.Stomach,this.TotalCases.Liver,this.TotalCases.Skin],
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// third one

const canvas2 = <HTMLCanvasElement> document.getElementById('mychart1');
    const ctx2 = canvas2.getContext('2d');
    console.log(this.SeverityRecord.high);
    const mychart1  = new Chart(ctx2, {
      type: 'pie',
      data: {
          labels: ["Cardiogist","Neurologist","Dentist","Pediatrician","Dermatologist"],
          datasets: [{
              label: 'Amount Spend',
              data: [this.costSpend.Cardiologist,this.costSpend.Neurologist,this.costSpend.Dentist,this.costSpend.Pediatrician,this.costSpend.Dermatologist],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
  });
 
  }
}


