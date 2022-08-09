import { Agents } from './agents_model';
import { Doctor } from 'src/app/model/doctor_model';
import { Appointment } from './appointment_model';
import { Medicare } from './medicare_service_model';
export interface Appointment{
    doctor: Doctor;
    agent: Agents;
    timeSlot: number;
    dateOfAppointment: Date;
    status: string;
    patientId: number;
}