import { MedicareService } from "./service/medicare.service";

import { DoctorService } from "./service/doctor.service";
import { SignupServiceService } from "./service/signup-service.service";
import { LoginServiceService } from "./service/login-service.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { LoginComponent } from "./login/login.component";
import { FooterComponent } from "./footer/footer.component";
import { SignupadminComponent } from "./site/signupadmin/signupadmin.component";

import { ReactiveFormsModule } from "@angular/forms";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { SignuppatientComponent } from "./site/signuppatient/signuppatient.component";
import { SignupdoctorComponent } from "./site/signupdoctor/signupdoctor.component";
import { ManagedoctorComponent } from "./pages/admin/managedoctor/managedoctor.component";
import { AdminhomeComponent } from "./pages/admin/adminhome/adminhome.component";
import { ManagepatientComponent } from "./pages/admin/managepatient/managepatient.component";
import { ManageagentComponent } from "./pages/admin/manageagent/manageagent.component";
import { AddagentComponent } from "./pages/admin/manageagent/addagent/addagent.component";
import { AgentsService } from "./service/agent.service";
import { ManagemedicareComponent } from "./pages/admin/managemedicare/managemedicare.component";
import { AddMedicareComponent } from "./pages/admin/add-medicare/add-medicare.component";
import { BookappointmentComponent } from "./pages/patient/bookappointment/bookappointment.component";
import { PatienthomeComponent } from "./pages/patient/patienthome/patienthome.component";
import { ViewappointmenthistoryComponent } from "./pages/patient/viewappointmenthistory/viewappointmenthistory.component";
import { ViewappointmentstatusComponent } from "./pages/patient/viewappointmentstatus/viewappointmentstatus.component";
import { ChoosedoctorsComponent } from "./pages/patient/bookappointment/choosedoctors/choosedoctors.component";
import { BookappointmentformComponent } from "./pages/patient/bookappointment/bookappointmentform/bookappointmentform.component";
import { AppointmentService } from "./service/appointment.service";
import { DoctorhomeComponent } from "./pages/doctor/doctorhome/doctorhome.component";
import { ViewappointmentsComponent } from "./pages/doctor/viewappointments/viewappointments.component";
import { TestresultsComponent } from "./pages/doctor/testresults/testresults.component";
import { GetstartedComponent } from "./getstarted/getstarted.component";
import { AgenthomeComponent } from "./pages/agent/agenthome/agenthome.component";
import { AgentPatientsComponent } from "./pages/agent/agent-patients/agent-patients.component";
import { TestResultFormComponent } from "./pages/doctor/test-result-form/test-result-form.component";
import { ViewTestResultComponent } from "./pages/patient/view-test-result/view-test-result.component";
import { GivefeedbackComponent } from "./pages/patient/givefeedback/givefeedback.component";
import { RatingModule } from "ng-starrating";
import { ViewreportComponent } from "./pages/doctor/viewreport/viewreport.component";
import { AboutusComponent } from "./aboutus/aboutus.component";
import { LoaderComponent } from "./loader/loader.component";
import { LoaderService } from './service/loader.service';
import { LoaderInterceptor } from './interceptor/LoaderInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    LoginComponent,
    FooterComponent,
    SignupadminComponent,
    SignuppatientComponent,
    SignupdoctorComponent,
    ManagedoctorComponent,
    AdminhomeComponent,
    ManagepatientComponent,
    ManageagentComponent,
    AddagentComponent,
    ManagemedicareComponent,
    AddMedicareComponent,
    BookappointmentComponent,
    PatienthomeComponent,
    ViewappointmenthistoryComponent,
    ViewappointmentstatusComponent,
    ChoosedoctorsComponent,
    BookappointmentformComponent,
    DoctorhomeComponent,
    ViewappointmentsComponent,
    TestresultsComponent,
    GetstartedComponent,
    AgenthomeComponent,
    AgentPatientsComponent,
    TestResultFormComponent,
    ViewTestResultComponent,
    GivefeedbackComponent,
    ViewreportComponent,
    AboutusComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RatingModule
  ],
  providers: [
    LoginServiceService,
    SignupServiceService,
    DoctorService,
    AgentsService,
    MedicareService,
    AppointmentService,
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
