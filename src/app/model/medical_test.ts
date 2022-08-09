import { Agents } from 'src/app/model/agents_model';
import { Doctor } from './doctor_model';
import { Patient } from './patient_model';

export interface MedicalTest {
    reportId: number;
    patient: Patient;
    doctor: Doctor;
    agent: Agents;
    testResultDate: Date;
    diagName1: string;
    diagName2: string;
    diagName3: string;
    diagName4: string;
    diagName5: string;
    diagName6: string;
    diagActualValue1: string;
    diagActualValue2: string;
    diagActualValue3: string;
    diagActualValue4: string;
    diagActualValue5: string;
    diagActualValue6: string;
    diagNormalRange1: string;
    diagNormalRange2: string;
    diagNormalRange3: string;
    diagNormalRange4: string;
    diagNormalRange5: string;
    diagNormalRange6: string;
    doctorComments: string;
    otherInfo: string;
    appointmentId: string;

}

export interface DiagTest{
    name: string;
    normalRange: string;
    actualValue: string;

}