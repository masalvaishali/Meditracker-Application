package com.doctor.doctorservice.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Medicare
{
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	int medicareServiceId;
	String medicareService;
	String serviceDescription;
	int amount;
	public int getMedicareServiceId() {
		return medicareServiceId;
	}
	public void setMedicareServiceId(int medicareServiceId) {
		this.medicareServiceId = medicareServiceId;
	}
	public String getMedicareService() {
		return medicareService;
	}
	public void setMedicareService(String medicareService) {
		this.medicareService = medicareService;
	}
	public String getServiceDescription() {
		return serviceDescription;
	}
	public void setServiceDescription(String serviceDescription) {
		this.serviceDescription = serviceDescription;
	}
	public int getAmount() {
		return amount;
	}
	public void setAmount(int amount) {
		this.amount = amount;
	}
	@Override
	public String toString() {
		return "MedicareService [medicareServiceId=" + medicareServiceId + ", medicareService=" + medicareService
				+ ", serviceDescription=" + serviceDescription + ", amount=" + amount + "]";
	}
	
	
}
