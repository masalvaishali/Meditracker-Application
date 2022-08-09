package com.doctor.doctorservice.service;

import java.util.List;
import java.util.stream.Collectors;


import com.doctor.doctorservice.dto.DoctorDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.doctorservice.dto.DoctorMedicareDTO;
import com.doctor.doctorservice.model.Doctor;
import com.doctor.doctorservice.model.Medicare;
import com.doctor.doctorservice.repo.DoctorRepository;
import com.doctor.doctorservice.repo.MedicareRepository;

@Service
public class DoctorServiceImpl implements DoctorService
{
	
	@Autowired
	DoctorRepository doctorRepo;
	
	@Autowired
	MedicareRepository medicareRepo;

	@Autowired
	ModelMapper modelMapper;
	
	//insert
	public Doctor saveDoctor(Doctor doctor)
	{
		return doctorRepo.save(doctor);
	}
	
	//get
	public DoctorDTO getDoctor(int id)
	{
		Doctor doctor= doctorRepo.findByDoctorId(id);
		if(doctor!=null) {
			DoctorDTO doctorDTO = modelMapper.map(doctor, DoctorDTO.class);
			return doctorDTO;
		}
		return null;
	}

	public Doctor getDoctorAllFields(int id){
		return doctorRepo.findByDoctorId(id);
	}

	public String getAuthId(int doctorId){
		Doctor doctor=doctorRepo.findByDoctorId(doctorId);
		return doctor.getAuthId();
	}


	//delete
	public String deleteDoctor(int id)
	{
		doctorRepo.deleteById(id);
		return "Doctor removed successfully !";
	}
	
	//update
	public Doctor updateDoctor(Doctor doctor)
	{
//		Doctor existingDoctor = doctorRepo.findById(doctor.getDoctorId()).orElse(null);
//		existingDoctor.setDoctorId(doctor.getDoctorId());
//		existingDoctor.setFirstName(doctor.getFirstName());
//		existingDoctor.setLastName(doctor.getLastName());
//		existingDoctor.setEmail(doctor.getEmail());
//		existingDoctor.setPassword(doctor.getPassword());
//		existingDoctor.setContactNumber(doctor.getContactNumber());
//		existingDoctor.setAltContactNumber(doctor.getAltContactNumber());
//		existingDoctor.setSecurityQue(doctor.getSecurityQue());
//		existingDoctor.setSecurityAns(doctor.getSecurityAns());
//		existingDoctor.setDateOfBirth(doctor.getDateOfBirth());
//		existingDoctor.setGender(doctor.getGender());
//		existingDoctor.setAddress1(doctor.getAddress1());
//		existingDoctor.setAddress2(doctor.getAddress2());
//		existingDoctor.setCity(doctor.getCity());
//		existingDoctor.setState(doctor.getState());
//		existingDoctor.setZipcode(doctor.getZipcode());
//		existingDoctor.setDegree(doctor.getDegree());
//		existingDoctor.setSpeciality(doctor.getSpeciality());
//		existingDoctor.setWorkHours(doctor.getWorkHours());
//		existingDoctor.setHospitalName(doctor.getHospitalName());
//		existingDoctor.setMedicareServiceId(doctor.getMedicareServiceId());
		return doctorRepo.save(doctor);
	}
	
	//getting list of doctors related to medicareserviceid
	public DoctorMedicareDTO getListOfDoctors(int medicareId)
	{
		DoctorMedicareDTO doctorMedicareDto = new DoctorMedicareDTO();
		
		List<Doctor> listOfDoctors = doctorRepo.getListOfDoctorsWithMedicareId(medicareId);
		Medicare medicare = medicareRepo.findById(medicareId).orElse(null);
		List<DoctorDTO> doctorDTOList =listOfDoctors.stream().map(doctor -> modelMapper.map(doctor, DoctorDTO.class))
			.collect(Collectors.toList());
		doctorMedicareDto.setListOFDoctors(doctorDTOList);
		doctorMedicareDto.setMedicare(medicare);
		return doctorMedicareDto;
	}

	@Override
	public Doctor getByEmailId(String emailId) {
		return doctorRepo.getByEmailId(emailId);
	}
}
