// import { ViewreportComponent } from "./pages/doctor/viewreport/viewreport.component";
import { GivefeedbackComponent } from "./pages/patient/givefeedback/givefeedback.component";

// import { TestresultsComponent } from "./pages/doctor/testresults/testresults.component";
import { ViewappointmentsComponent } from "./pages/doctor/viewappointments/viewappointments.component";
import { DoctorhomeComponent } from "./pages/doctor/doctorhome/doctorhome.component";
import { BookappointmentformComponent } from "./pages/patient/bookappointment/bookappointmentform/bookappointmentform.component";
import { ChoosedoctorsComponent } from "./pages/patient/bookappointment/choosedoctors/choosedoctors.component";
import { ViewappointmentstatusComponent } from "./pages/patient/viewappointmentstatus/viewappointmentstatus.component";
// import { ViewappointmenthistoryComponent } from "./pages/patient/viewappointmenthistory/viewappointmenthistory.component";
import { PatientsRecordsComponent } from './pages/doctor/patients-records/patients-records.component';

import { SignupdoctorComponent } from "./site/signupdoctor/signupdoctor.component";
import { SignuppatientComponent } from "./site/signuppatient/signuppatient.component";

import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PatienthomeComponent } from "./pages/patient/patienthome/patienthome.component";
import { BookappointmentComponent } from "./pages/patient/bookappointment/bookappointment.component";
import { AnalyticsFeaturesComponent } from './pages/patient/analytics-features/analytics-features.component';

import { GetstartedComponent } from "./getstarted/getstarted.component";

// import { TestResultFormComponent } from "./pages/doctor/test-result-form/test-result-form.component";
// import { ViewTestResultComponent } from "./pages/patient/view-test-result/view-test-result.component";
import { AuthGuardService } from "./service/authguard.service";
import { PatientRecordsComponent } from "./pages/patient/patient-records/patient-records.component";
import { UpdateProfileDoctorComponent } from "./site/update-profile-doctor/update-profile-doctor.component";
import { UpdateProfilePatientComponent } from "./site/update-profile-patient/update-profile-patient.component";
import { HospitalsNearbyComponent } from './pages/patient/hospitals-nearby/hospitals-nearby.component';
import { AmbulancesNearbyComponent } from './pages/patient/ambulances-nearby/ambulances-nearby.component';
import { DoctInsightsComponent } from "./pages/doctor/doct-insights/doct-insights.component";
import { GoogleMapComponent } from "./pages/patient/google-map/google-map.component";
import { PatientInsuranceComponent } from "./pages/patient/patient-insurance/patient-insurance.component";
import { ScheduledDrugsComponent } from './pages/patient/scheduled-drugs/scheduled-drugs.component';

const routes: Routes = [
  { path: "signup-patient", component: SignuppatientComponent },
  { path: "signup-doctor", component: SignupdoctorComponent },
  { path: "login", component: LoginComponent },
 
  {
    path: "patient",
    children: [
      {
        path: "home",
        component: PatienthomeComponent,
      },
      {
        path: "ambulances-near",
        component: AmbulancesNearbyComponent,
      },
      {
        path: "hospitals-nearby",
        component: HospitalsNearbyComponent,
      },
      {
        path: "patient-analytics",
        component: AnalyticsFeaturesComponent,
      },
      {
        path:'updatePatientProfile',
        component:UpdateProfilePatientComponent
      },
      {
        path: "bookappointment",
        component: BookappointmentComponent,
      },
      {
        path: "view-records",
        component: PatientRecordsComponent,
      },
      {
        path: "insurance",
        component: PatientInsuranceComponent,
      },
      {
        path: "scheduleddrugs",
        component: ScheduledDrugsComponent,
      },
      {
        path:"location",
        component:GoogleMapComponent
      },
      {
        path: "bookappointment",
        children: [
          {
            path: "choosedoctors/:id",
            component: ChoosedoctorsComponent,
          },
          {
            path: "bookappointmentform/:medId/:docId",
            component: BookappointmentformComponent,
          },
        ],
      },
      {
        path: "viewappointmentstatus",
        component: ViewappointmentstatusComponent,
      },
      {
        path: "givefeedback/:id",
        component: GivefeedbackComponent,
      },
      {
        path: "updatePatientProfile",
        component: UpdateProfilePatientComponent,
      },
    ],
    // canActivate: [AuthGuardService]
  },
  {
    path: "doctor",
    children: [
      {
        path: "home",
        component: DoctorhomeComponent,
      },
      {
        path: "viewappointments",
        component: ViewappointmentsComponent,
      },
      {
        path: "viewappointments/patient-records/:id",
        component: PatientsRecordsComponent,
      },
      {
        path:'updateDoctorProfile',
        component:UpdateProfileDoctorComponent
      },
      {
        path:'doctorInsights',
        component:DoctInsightsComponent
      }
    ],
    // canActivate: [AuthGuardService]
  },

  { path: "", component: GetstartedComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
