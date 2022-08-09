import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { Patient } from "../model/patient_model";

@Injectable({
  providedIn: "root",
})
export class PatientService {
  latitude: number;
  longitude: number;
  redirectUrl = "/";
  loggedIn: boolean = false;
  name: string;
  validCredentials: boolean = false;
  baseUrl = environment.baseUrl;
  private patientsUrl = this.baseUrl + "/patient/";
  private analyticsurl = this.baseUrl + "/patient/";
  private downloadRecordUrl = this.baseUrl + "/patient/record/downloadRecord/";
  private AppointmentDetialsOfDocUrl = this.baseUrl + "/patient/doctor/";
  private InsuranceEmailUrl = "/patient/{patientId}/insurance/sendEmail";
  authCredentials = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("jwt_token"),
    }),
  };

  constructor(public router: Router, private http: HttpClient) {}

  getAllPatients() {
    return this.http.get(this.patientsUrl, this.authCredentials);
  }

  updateLocation(location: any) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
  getInsuranceDetails(patientId) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.get(this.patientsUrl + patientId + "/insurance", {
      headers: headers,
    });
  }

  uploadRecords(obj) {
    let headers = {
      headers: new HttpHeaders({
        // 'mimeType': 'multipart/form-data',
        Authorization: localStorage.getItem("jwt_token"),
      }),
    };
    return this.http.post(this.patientsUrl + "record", obj, headers);
  }

  uploadInsurance(obj) {
    let headers = {
      headers: new HttpHeaders({
        // 'mimeType': 'multipart/form-data',
        Authorization: localStorage.getItem("jwt_token"),
      }),
    };
    return this.http.post(this.patientsUrl + "insurance", obj, headers);
  }

  insuranceEmail(obj) {
    const params = new URLSearchParams();
    params.set("condition", obj["condition"]);
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.post(
      this.patientsUrl +
        localStorage.getItem("userId") +
        `/insurance/sendEmail?condition=${obj["condition"]}`,
      null,
      { headers: headers }
    );
  }
  insurancedrEmail(obj,patientId) {
    const params = new URLSearchParams();
    params.set("condition", obj["condition"]);
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.post(
      this.baseUrl +
        "/doctor/patient/" +
        patientId +
        `/insurance/sendEmail?condition=${obj["condition"]}`,
      null,
      { headers: headers }
    );
  }

  getAppointmentsForTheDoctor(docId) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.get(
      this.AppointmentDetialsOfDocUrl + docId + "/getAppointmentAvailability",
      { headers: headers }
    );
  }

  downloadRecord(id) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.get(this.downloadRecordUrl + id, {
      headers: headers,
      responseType: "blob" as "json",
    });
  }
  getPatientAnalyticalData(patientId) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    console.log(patientId, "inside the patient service");
    return this.http.get(this.analyticsurl + patientId + "/insights", {
      headers: headers,
    });
  }
  updatePatientApproval(patient: Patient) {
    return this.http.put<Patient>(
      this.patientsUrl,
      patient,
      this.authCredentials
    );
  }
  updateRecord(id) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.get(this.patientsUrl + id + "/record", {
      headers: headers,
    });
  }

  getPatient(id, credentials) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + credentials);
    return this.http.get(this.patientsUrl + id, { headers: headers });
  }

  getPatientDetailsByDOctor(doctorId, patientId, credentials) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", "Bearer " + credentials);
    return this.http.get(
      this.baseUrl + "/doctor/" + doctorId + "/patient" + patientId
    );
  }

  getHospitals() {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.get(
      this.patientsUrl + localStorage.getItem("userId") + "/hospital",
      { headers: headers }
    );
  }

  bookAmbulance(hospitalId) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.post(
      this.baseUrl +
        `/patient/${localStorage.getItem(
          "userId"
        )}/hospital/${hospitalId}/bookAmbulance`,
      null,
      { headers: headers }
    );
  }
  cancelAmbulance(hospitalId, ambulanceNo) {
    let headers = new HttpHeaders();
    headers = headers.set("Authorization", localStorage.getItem("jwt_token"));
    return this.http.post(
      this.baseUrl +
        `/patient/hospital/${hospitalId}/ambulance/${ambulanceNo}/cancelBooking`,
      null,
      { headers: headers }
    );
  }
}
