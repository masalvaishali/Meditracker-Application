package com.ambulance.controller;

import com.ambulance.dto.AmbulanceDTO;
import com.ambulance.dto.BookingDTO;
import com.ambulance.dto.HospitalDTO;
import com.ambulance.dto.PatientDTO;
import com.ambulance.model.Ambulance;
import com.ambulance.model.Hospital;
import com.ambulance.service.AmbulanceService;
import com.ambulance.service.HospitalService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/hospital")
public class HospitalController
{
    @Autowired
    HospitalService hospitalService;

    @Autowired
    AmbulanceService ambulanceService;

    @Autowired
    ModelMapper modelmapper;

    @PostMapping("/insert")
    public ResponseEntity<?> saveHospital(@RequestBody Hospital hospital)
    {
        Hospital hospital1 = hospitalService.saveHospital(hospital);
        return new ResponseEntity<>(hospital1, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getHospital(@PathVariable("id") int id)
    {
        Hospital hospital = hospitalService.getHospital(id);
        return new ResponseEntity<>(hospital, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateHospital(@RequestBody Hospital hospital)
    {
        Hospital hospital1 = hospitalService.updateHospital(hospital);
        return new ResponseEntity<>(hospital1,HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteHospital(@PathVariable("id") int id)
    {
        String response = hospitalService.deleteHospital(id);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    @GetMapping("/city/{city}")
    public  ResponseEntity<?> getHospitalByCity(@PathVariable("city") String city)
    {
        List<Hospital> hospitals = hospitalService.getHospitalByCity(city.toLowerCase());
        if(hospitals == null)
            return new ResponseEntity<>("Could not find hospitals",HttpStatus.NOT_FOUND);
        List<HospitalDTO> hospitalDTOs =hospitals.stream().map(hospital -> modelmapper.map(hospital,HospitalDTO.class)).collect(Collectors.toList());
        return new ResponseEntity<>(hospitalDTOs,HttpStatus.OK);
    }

    @PostMapping("/{hospitalId}/book")
    public ResponseEntity<?> book(@PathVariable("hospitalId") int hospitalId, @RequestBody PatientDTO patientDTO)
    {
        Hospital hospital = hospitalService.getHospital(hospitalId);
        if(hospital.getNumberOfAmbulance()>0)
        {
            hospital.setNumberOfAmbulance(hospital.getNumberOfAmbulance()-1);
            hospitalService.saveHospital(hospital);
            BookingDTO booking = new BookingDTO();
            booking.setPatient(patientDTO);
            for(String ambulanceNos : hospital.getAmbulanceNos())
            {
                Ambulance ambulance = ambulanceService.getAmbulance(ambulanceNos);
                if(ambulance.getAvailability())
                {
                    ambulance.setAvailability(false);
                    ambulanceService.updateAmbulance(ambulance);
                    AmbulanceDTO ambulanceDTO = modelmapper.map(ambulance,AmbulanceDTO.class);
                    booking.setAmbulance(ambulanceDTO);
                    break;
                }
            }
            HospitalDTO hospitalDTO = modelmapper.map(hospital, HospitalDTO.class);
            booking.setHospital(hospitalDTO);
            return new ResponseEntity<>(booking,HttpStatus.OK);
        }
        return new ResponseEntity<>("No Ambulance available!",HttpStatus.BAD_REQUEST);
    }

    @PostMapping("/{hospitalId}/cancelbooking/ambulance/{ambulanceNo}")
    public ResponseEntity<?> cancel(@PathVariable("hospitalId") int hospitalId, @PathVariable("ambulanceNo") String ambulanceNo)
    {
        Hospital hospital = hospitalService.getHospital(hospitalId);
        Ambulance ambulance = ambulanceService.getAmbulance(ambulanceNo);
        ambulance.setAvailability(true);
        hospital.setNumberOfAmbulance(hospital.getNumberOfAmbulance()+1);
        hospitalService.saveHospital(hospital);
        ambulanceService.updateAmbulance(ambulance);
        return new ResponseEntity<>("Ambulance booking cancelled successfully!",HttpStatus.OK);
    }

}

