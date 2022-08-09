package com.doctor.doctorservice.service;

import com.doctor.doctorservice.dto.DoctorDTO;
import com.doctor.doctorservice.dto.DoctorMedicareDTO;
import com.doctor.doctorservice.model.Doctor;

public interface DoctorService {
	
	public Doctor saveDoctor(Doctor doctor);
	
	public DoctorDTO getDoctor(int id);
	
	public String deleteDoctor(int id);
	
	public Doctor updateDoctor(Doctor doctor);
	
	public DoctorMedicareDTO getListOfDoctors(int medicareId);

    Doctor getByEmailId(String emailId);

    String getAuthId(int doctorId);

	public Doctor getDoctorAllFields(int id);
}
