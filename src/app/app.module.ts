import { MedicareService } from "./service/medicare.service";

import { DoctorService } from "./service/doctor.service";
import { SignupServiceService } from "./service/signup-service.service";
import { LoginServiceService } from "./service/login-service.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { AgmDirectionModule} from 'agm-direction';
import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SignuppatientComponent } from "./site/signuppatient/signuppatient.component";
import { SignupdoctorComponent } from "./site/signupdoctor/signupdoctor.component";

import { BookappointmentComponent } from "./pages/patient/bookappointment/bookappointment.component";
import { PatienthomeComponent } from "./pages/patient/patienthome/patienthome.component";
// import { ViewappointmenthistoryComponent } from "./pages/patient/viewappointmenthistory/viewappointmenthistory.component";
import { ViewappointmentstatusComponent } from "./pages/patient/viewappointmentstatus/viewappointmentstatus.component";
import { ChoosedoctorsComponent } from "./pages/patient/bookappointment/choosedoctors/choosedoctors.component";
import { BookappointmentformComponent } from "./pages/patient/bookappointment/bookappointmentform/bookappointmentform.component";
import { AppointmentService } from "./service/appointment.service";
import { DoctorhomeComponent } from "./pages/doctor/doctorhome/doctorhome.component";
import { ViewappointmentsComponent } from "./pages/doctor/viewappointments/viewappointments.component";

import { GetstartedComponent } from "./getstarted/getstarted.component";
import { SearchPatientPipe } from "./pipes/search.pipe";
import { SearchRecordsPipe } from "./pipes/searchrecords.pipe";
import { SearchDeptPipe } from "./pipes/filterdep.pipe";

import { GivefeedbackComponent } from "./pages/patient/givefeedback/givefeedback.component";
import { RatingModule } from "ng-starrating";

import { LoaderComponent } from "./loader/loader.component";
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './interceptor/LoaderInterceptor';
import { PatientRecordsComponent } from "./pages/patient/patient-records/patient-records.component";
import { UpdateProfileDoctorComponent } from './site/update-profile-doctor/update-profile-doctor.component';
import { UpdateProfilePatientComponent } from './site/update-profile-patient/update-profile-patient.component';
import { PatientsRecordsComponent } from './pages/doctor/patients-records/patients-records.component';

import { AnalyticsFeaturesComponent } from './pages/patient/analytics-features/analytics-features.component';
import { HospitalsNearbyComponent } from './pages/patient/hospitals-nearby/hospitals-nearby.component';
import { AmbulancesNearbyComponent } from './pages/patient/ambulances-nearby/ambulances-nearby.component';
import { DoctInsightsComponent } from './pages/doctor/doct-insights/doct-insights.component';
import { GoogleMapComponent } from './pages/patient/google-map/google-map.component';
import { PatientInsuranceComponent } from './pages/patient/patient-insurance/patient-insurance.component';
import { ScheduledDrugsComponent } from './pages/patient/scheduled-drugs/scheduled-drugs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    FooterComponent,
    SignuppatientComponent,
    SignupdoctorComponent,
    BookappointmentComponent,
    PatienthomeComponent,
    SearchPatientPipe,
    SearchRecordsPipe,
    SearchDeptPipe,
    ViewappointmentstatusComponent,
    ChoosedoctorsComponent,
    BookappointmentformComponent,
    DoctorhomeComponent,
    ViewappointmentsComponent,
    GetstartedComponent,
    AnalyticsFeaturesComponent,
    GivefeedbackComponent,
    LoaderComponent,
    PatientRecordsComponent,
    UpdateProfileDoctorComponent,
    UpdateProfilePatientComponent,
    PatientsRecordsComponent,
    HospitalsNearbyComponent,
    AmbulancesNearbyComponent,
    DoctInsightsComponent,
    GoogleMapComponent,
    PatientInsuranceComponent,
    ScheduledDrugsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgmDirectionModule,
    RatingModule,
    AgmCoreModule.forRoot({
      apiKey:'AIzaSyC0XkuKhDbv4jjHULl0S8zLiZOH0oZJ3vM',
      libraries: ['geometry']
    })
  ],
  providers: [
    LoginServiceService,
    SignupServiceService,
    DoctorService,
    MedicareService,
    AppointmentService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
