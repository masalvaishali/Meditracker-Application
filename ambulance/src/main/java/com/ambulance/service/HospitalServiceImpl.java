package com.ambulance.service;

import com.ambulance.model.Hospital;
import com.ambulance.repo.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HospitalServiceImpl implements HospitalService
{
    @Autowired
    HospitalRepository hospitalRepo;

    //insert
    public Hospital saveHospital(Hospital hospital)
    {
        return hospitalRepo.save(hospital);
    }

    //get
    public Hospital getHospital(int id)
    {
        Hospital hospital = hospitalRepo.findByHospitalId(id);
        return hospital;
    }

    //delete
    public String deleteHospital(int id)
    {
        hospitalRepo.deleteById(id);
        return "Hospital removed successfully !";
    }

    //update
    public Hospital updateHospital(Hospital hospital)
    {
        return hospitalRepo.save(hospital);
    }

    public List<Hospital> getHospitalByCity(String city)
    {
        return hospitalRepo.getHospitalByCity(city);
    }

}
