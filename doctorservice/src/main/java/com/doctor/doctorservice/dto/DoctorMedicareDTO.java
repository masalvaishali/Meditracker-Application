package com.doctor.doctorservice.dto;

import java.util.List;

import com.doctor.doctorservice.model.Medicare;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class DoctorMedicareDTO 
{
	List<DoctorDTO> listOFDoctors;
	Medicare medicare;
//	public List<Doctor> getListOFDoctors() {
//		return listOFDoctors;
//	}
//	public void setListOFDoctors(List<Doctor> listOFDoctors) {
//		this.listOFDoctors = listOFDoctors;
//	}
//	public Medicare getMedicare() {
//		return medicare;
//	}
//	public void setMedicare(Medicare medicare) {
//		this.medicare = medicare;
//	}
//	@Override
//	public String toString() {
//		return "DoctorMedicareDTO [listOFDoctors=" + listOFDoctors + ", medicare=" + medicare + "]";
//	}
}
