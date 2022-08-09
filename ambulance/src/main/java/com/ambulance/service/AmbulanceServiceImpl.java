package com.ambulance.service;

import com.ambulance.model.Ambulance;
import com.ambulance.model.Hospital;
import com.ambulance.repo.AmbulanceRepository;
import com.ambulance.repo.HospitalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AmbulanceServiceImpl implements AmbulanceService
{
    @Autowired
    AmbulanceRepository ambulanceRepo;

    @Autowired
    HospitalRepository hospitalRepo;

    //insert
    public Ambulance saveAmbulance(Ambulance ambulance, int hospitalId)
    {
        Hospital hospital = hospitalRepo.findByHospitalId(hospitalId);
        hospital.getAmbulanceNos().add(ambulance.getAmbulanceNo());
        hospital.setNumberOfAmbulance(hospital.getNumberOfAmbulance()+1);
        hospitalRepo.save(hospital);
        return ambulanceRepo.save(ambulance);
    }

    //get
    public Ambulance getAmbulance(String ambulanceNo)
    {
        Ambulance ambulance = ambulanceRepo.findByAmbulanceNo(ambulanceNo);
        return ambulance;
    }

//    delete
    public String deleteAmbulance(String ambulanceNo)
    {
        ambulanceRepo.deleteByAmbulanceNo(ambulanceNo);
        return "Ambulance removed successfully !";
    }

    //update
    public Ambulance updateAmbulance(Ambulance ambulance)
    {
        return ambulanceRepo.save(ambulance);
    }

}
