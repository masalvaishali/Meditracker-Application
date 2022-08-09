
// import { Doctor } from 'src/app/model/doctor_model';
import { Medicare } from './medicare_service_model';

export interface Appointment{
    doctorId: number;
    appointmentId: number;
    timeSlotId: number;
    patientName: string;
    doctorName: string;
    appointmentDate: Date;
    status: string;
    patientId: number;
}
