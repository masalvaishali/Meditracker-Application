package com.ambulance.repo;

import com.ambulance.model.Ambulance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AmbulanceRepository extends JpaRepository<Ambulance, Integer>
{
    @Query("select a from Ambulance a where a.ambulanceNo = :ambulanceNo")
    Ambulance findByAmbulanceNo(String ambulanceNo);

    @Query("delete from Ambulance a where a.ambulanceNo = :ambulanceNo")
    Ambulance deleteByAmbulanceNo(@Param("ambulanceNo") String ambulanceNo);
}
