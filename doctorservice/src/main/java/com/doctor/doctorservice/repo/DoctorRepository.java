package com.doctor.doctorservice.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.doctor.doctorservice.model.Doctor;

public interface DoctorRepository extends JpaRepository<Doctor, Integer>
{

	@Query("select d from Doctor d where d.medicareServiceId = :medicareId")
	public List<Doctor> getListOfDoctorsWithMedicareId(@Param("medicareId") int medicareId);

    Doctor getByEmailId(String emailId);

	Doctor findByDoctorId(int id);
}
