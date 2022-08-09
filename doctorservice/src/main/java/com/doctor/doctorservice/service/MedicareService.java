package com.doctor.doctorservice.service;

import com.doctor.doctorservice.model.Medicare;

import java.util.List;

public interface MedicareService 
{
	public Medicare saveMedicare(Medicare medicare);
	
	public Medicare getMedicare(int id);
	
	public String deleteMedicare(int id);
	
	public Medicare updateMedicare(Medicare medicare);

    List<Medicare> findAll();
}
