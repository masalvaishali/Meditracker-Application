package com.ambulance.service;

import com.ambulance.model.Ambulance;

public interface AmbulanceService
{
    public Ambulance saveAmbulance(Ambulance ambulance, int hospitalId);

    public Ambulance getAmbulance(String ambulanceNo);

    public String deleteAmbulance(String ambulanceNo);

    public Ambulance updateAmbulance(Ambulance ambulance);

}
