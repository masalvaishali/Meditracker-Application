package com.doctor.doctorservice.model;

import javax.persistence.*;
import javax.validation.constraints.Digits;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.Type;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Doctor 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int doctorId;
	String authId;
	String firstName;
	String lastName;
	String emailId;
	String password;
	@ElementCollection
	Map<String, BigDecimal> rating =new HashMap<>();
	int totalRatings;
	String contactNumber;
	String altContactNumber;
	String securityQue;
	String securityAns;
	String dateOfBirth;
	String gender;
	String address1;
	String address2;
	String city;
	String state;
	int zipcode;
	String degree;
	String license;
	String speciality;
	int workHours;
	String hospitalName;
	int medicareServiceId;

//	public int getDoctorId() {
//		return doctorId;
//	}
//	public void setDoctorId(int doctorId) {
//		this.doctorId = doctorId;
//	}
//	public String getFirstName() {
//		return firstName;
//	}
//	public void setFirstName(String firstName) {
//		this.firstName = firstName;
//	}
//	public String getLastName() {
//		return lastName;
//	}
//	public void setLastName(String lastName) {
//		this.lastName = lastName;
//	}
//	public String getEmail() {
//		return email;
//	}
//	public void setEmail(String email) {
//		this.email = email;
//	}
//	public String getPassword() {
//		return password;
//	}
//	public void setPassword(String password) {
//		this.password = password;
//	}
//	public String getContactNumber() {
//		return contactNumber;
//	}
//	public void setContactNumber(String contactNumber) {
//		this.contactNumber = contactNumber;
//	}
//	public String getAltContactNumber() {
//		return altContactNumber;
//	}
//	public void setAltContactNumber(String altContactNumber) {
//		this.altContactNumber = altContactNumber;
//	}
//	public String getSecurityQue() {
//		return securityQue;
//	}
//	public void setSecurityQue(String securityQue) {
//		this.securityQue = securityQue;
//	}
//	public String getSecurityAns() {
//		return securityAns;
//	}
//	public void setSecurityAns(String securityAns) {
//		this.securityAns = securityAns;
//	}
//	public String getDateOfBirth() {
//		return dateOfBirth;
//	}
//	public void setDateOfBirth(String dateOfBirth) {
//		this.dateOfBirth = dateOfBirth;
//	}
//	public String getGender() {
//		return gender;
//	}
//	public void setGender(String gender) {
//		this.gender = gender;
//	}
//	public String getAddress1() {
//		return address1;
//	}
//	public void setAddress1(String address1) {
//		this.address1 = address1;
//	}
//	public String getAddress2() {
//		return address2;
//	}
//	public void setAddress2(String address2) {
//		this.address2 = address2;
//	}
//	public String getCity() {
//		return city;
//	}
//	public void setCity(String city) {
//		this.city = city;
//	}
//	public String getState() {
//		return state;
//	}
//	public void setState(String state) {
//		this.state = state;
//	}
//	public int getZipcode() {
//		return zipcode;
//	}
//	public void setZipcode(int zipcode) {
//		this.zipcode = zipcode;
//	}
//	public String getDegree() {
//		return degree;
//	}
//	public void setDegree(String degree) {
//		this.degree = degree;
//	}
//	public String getSpeciality() {
//		return speciality;
//	}
//	public void setSpeciality(String speciality) {
//		this.speciality = speciality;
//	}
//	public int getWorkHours() {
//		return workHours;
//	}
//	public void setWorkHours(int workHours) {
//		this.workHours = workHours;
//	}
//	public String getHospitalName() {
//		return hospitalName;
//	}
//	public void setHospitalName(String hospitalName) {
//		this.hospitalName = hospitalName;
//	}
//	public int getMedicareServiceId() {
//		return medicareServiceId;
//	}
//	public void setMedicareServiceId(int medicareServiceId) {
//		this.medicareServiceId = medicareServiceId;
//	}
//	@Override
//	public String toString() {
//		return "Doctor [doctorId=" + doctorId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
//				+ email + ", password=" + password + ", contactNumber=" + contactNumber + ", altContactNumber="
//				+ altContactNumber + ", securityQue=" + securityQue + ", securityAns=" + securityAns + ", dateOfBirth="
//				+ dateOfBirth + ", gender=" + gender + ", address1=" + address1 + ", address2=" + address2 + ", city="
//				+ city + ", state=" + state + ", zipcode=" + zipcode + ", degree=" + degree + ", speciality="
//				+ speciality + ", workHours=" + workHours + ", hospitalName=" + hospitalName + ", medicareServiceId="
//				+ medicareServiceId + "]";
//	}
//
	
}
