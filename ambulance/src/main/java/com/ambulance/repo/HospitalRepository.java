package com.ambulance.repo;

import com.ambulance.model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HospitalRepository extends JpaRepository<Hospital, Integer>
{
    Hospital findByHospitalId(int id);

    @Query("select h from Hospital h where h.city = :city")
    public List<Hospital> getHospitalByCity(@Param("city") String city);

}
