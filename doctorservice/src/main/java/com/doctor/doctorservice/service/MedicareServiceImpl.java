package com.doctor.doctorservice.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.doctor.doctorservice.model.Medicare;
import com.doctor.doctorservice.repo.MedicareRepository;

import java.util.List;

@Service
public class MedicareServiceImpl implements MedicareService 
{
		@Autowired
		MedicareRepository medicareRepo;
	
		//insert
		public Medicare saveMedicare(Medicare medicare)
		{
			return medicareRepo.save(medicare);
		}
		
		//get
		public Medicare getMedicare(int id)
		{
			return medicareRepo.findById(id).orElse(null);
		}
		
		//delete
		public String deleteMedicare(int id)
		{
			medicareRepo.deleteById(id);
			return "Medicare service removed successfully !";
		}
		
		public Medicare updateMedicare(Medicare medicare)
		{
			Medicare existingMedicare = medicareRepo.findById(medicare.getMedicareServiceId()).orElse(null);
			existingMedicare.setMedicareService(medicare.getMedicareService());
			existingMedicare.setServiceDescription(medicare.getServiceDescription());
			existingMedicare.setAmount(medicare.getAmount());
			return medicareRepo.save(existingMedicare);
		}

	@Override
	public List<Medicare> findAll() {
		return medicareRepo.findAll();
	}
}
