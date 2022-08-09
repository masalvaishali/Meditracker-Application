package com.doctor.doctorservice.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.doctor.doctorservice.model.Medicare;

public interface MedicareRepository extends JpaRepository<Medicare, Integer>{

}
