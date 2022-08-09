package com.medikart.patient.entity;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Patient 
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long patientId;
	String authId;
	String firstName;
	String lastName;
	@Column(nullable = false,unique = true)
	String emailId;
	@Column(nullable = false)
	String password;
	String contactNumber;
	String altContactNumber;
	String securityQuestion;
	String securityAnswer;
	String dateOfBirth;
	String gender;
	String address1;
	String address2;
	String city;
	String state;
	String zipcode;
//	public int getPatientId() {
//		return patientId;
//	}
//	public void setPatientId(int patientId) {
//		this.patientId = patientId;
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
//	public String getEmailId() {
//		return emailId;
//	}
//	public void setEmailId(String emailId) {
//		this.emailId = emailId;
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
//	public String getSecurityQuestion() {
//		return securityQuestion;
//	}
//	public void setSecurityQuestion(String securityQuestion) {
//		this.securityQuestion = securityQuestion;
//	}
//	public String getSecurityAnswer() {
//		return securityAnswer;
//	}
//	public void setSecurityAnswer(String securityAnswer) {
//		this.securityAnswer = securityAnswer;
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
//	public String getZipcode() {
//		return zipcode;
//	}
//	public void setZipcode(String zipcode) {
//		this.zipcode = zipcode;
//	}
//	@Override
//	public String toString() {
//		return "Patient [patientId=" + patientId + ", firstName=" + firstName + ", lastName=" + lastName + ", emailId="
//				+ emailId + ", password=" + password + ", contactNumber=" + contactNumber + ", altContactNumber="
//				+ altContactNumber + ", securityQuestion=" + securityQuestion + ", securityAnswer=" + securityAnswer
//				+ ", dateOfBirth=" + dateOfBirth + ", gender=" + gender + ", address1=" + address1 + ", address2="
//				+ address2 + ", city=" + city + ", state=" + state + ", zipcode=" + zipcode + "]";
//	}
//
}
