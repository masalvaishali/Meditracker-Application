import { AboutusComponent } from "./aboutus/aboutus.component";
import { ViewreportComponent } from "./pages/doctor/viewreport/viewreport.component";
import { GivefeedbackComponent } from "./pages/patient/givefeedback/givefeedback.component";
import { AgenthomeComponent } from "./pages/agent/agenthome/agenthome.component";
import { TestresultsComponent } from "./pages/doctor/testresults/testresults.component";
import { ViewappointmentsComponent } from "./pages/doctor/viewappointments/viewappointments.component";
import { DoctorhomeComponent } from "./pages/doctor/doctorhome/doctorhome.component";
import { BookappointmentformComponent } from "./pages/patient/bookappointment/bookappointmentform/bookappointmentform.component";
import { ChoosedoctorsComponent } from "./pages/patient/bookappointment/choosedoctors/choosedoctors.component";
import { ViewappointmentstatusComponent } from "./pages/patient/viewappointmentstatus/viewappointmentstatus.component";
import { ViewappointmenthistoryComponent } from "./pages/patient/viewappointmenthistory/viewappointmenthistory.component";
import { AddMedicareComponent } from "./pages/admin/add-medicare/add-medicare.component";
import { ManageagentComponent } from "./pages/admin/manageagent/manageagent.component";
import { AdminhomeComponent } from "./pages/admin/adminhome/adminhome.component";
import { ManagedoctorComponent } from "./pages/admin/managedoctor/managedoctor.component";
import { SignupdoctorComponent } from "./site/signupdoctor/signupdoctor.component";
import { SignuppatientComponent } from "./site/signuppatient/signuppatient.component";
import { SignupadminComponent } from "./site/signupadmin/signupadmin.component";
import { LoginComponent } from "./login/login.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ManagepatientComponent } from "./pages/admin/managepatient/managepatient.component";
import { AddagentComponent } from "./pages/admin/manageagent/addagent/addagent.component";
import { ManagemedicareComponent } from "./pages/admin/managemedicare/managemedicare.component";
import { PatienthomeComponent } from "./pages/patient/patienthome/patienthome.component";
import { BookappointmentComponent } from "./pages/patient/bookappointment/bookappointment.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { GetstartedComponent } from "./getstarted/getstarted.component";
import { AgentPatientsComponent } from "./pages/agent/agent-patients/agent-patients.component";
import { TestResultFormComponent } from "./pages/doctor/test-result-form/test-result-form.component";
import { ViewTestResultComponent } from "./pages/patient/view-test-result/view-test-result.component";
import { AuthGuardService } from "./service/authguard.service";

const routes: Routes = [
  { path: "", component: HomepageComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "signup-admin", component: SignupadminComponent },
  { path: "signup-patient", component: SignuppatientComponent },
  { path: "signup-doctor", component: SignupdoctorComponent },
  { path: "login", component: LoginComponent },
  {
    path: "admin",
    children: [
      {
        path: "home",
        component: AdminhomeComponent
      },
      {
        path: "manage-doctors",
        component: ManagedoctorComponent
      },
      {
        path: "manage-patients",
        component: ManagepatientComponent
      },
      {
        path: "manage-agent",
        component: ManageagentComponent
      },
      {
        path: "manage-agent",
        children: [{ path: "add-agent", component: AddagentComponent }]
      },
      {
        path: "manage-medicare",
        component: ManagemedicareComponent
      },

      {
        path: "manage-medicare",
        children: [{ path: "add-medicare", component: AddMedicareComponent }]
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: "patient",
    children: [
      {
        path: "home",
        component: PatienthomeComponent
      },
      {
        path: "bookappointment",
        component: BookappointmentComponent
      },
      {
        path: "bookappointment",
        children: [
          {
            path: "choosedoctors/:id",
            component: ChoosedoctorsComponent
          },
          {
            path: "bookappointmentform/:medId/:docId",
            component: BookappointmentformComponent
          }
        ]
      },
      {
        path: "viewappointmenthistory",
        component: ViewappointmenthistoryComponent
      },
      {
        path: "viewappointmenthistory",
        children: [
          {
            path: "viewtestresult/:id",
            component: ViewTestResultComponent
          }
        ]
      },
      {
        path: "viewappointmentstatus",
        component: ViewappointmentstatusComponent
      },
      {
        path: "testresults/givefeedback/:id",
        component: GivefeedbackComponent
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: "doctor",
    children: [
      {
        path: "home",
        component: DoctorhomeComponent
      },
      {
        path: "viewappointments",
        component: ViewappointmentsComponent
      },
      {
        path: "testresults",
        component: TestresultsComponent
      },
      {
        path: "testresults",
        children: [
          {
            path: "testresultform/:id",
            component: TestResultFormComponent
          },
          {
            path: "viewreport/:id",
            component: ViewreportComponent
          }
        ]
      }
    ],
    canActivate: [AuthGuardService]
  },
  {
    path: "agent",
    children: [
      {
        path: "home",
        component: AgenthomeComponent
      },
      {
        path: "appointments",
        component: AgentPatientsComponent
      }
    ],
    canActivate: [AuthGuardService]
  },

  { path: "getstarted", component: GetstartedComponent },

  { path: "about-us", component: AboutusComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
