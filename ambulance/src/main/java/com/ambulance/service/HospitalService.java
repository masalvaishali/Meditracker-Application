package com.ambulance.service;

import com.ambulance.model.Hospital;

import java.util.List;

public interface HospitalService
{
    public Hospital saveHospital(Hospital hospital);

    public Hospital getHospital(int id);

    public String deleteHospital(int id);

    public Hospital updateHospital(Hospital hospital);

    public List<Hospital> getHospitalByCity(String city);
}
