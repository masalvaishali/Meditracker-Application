import { Medicare } from "./medicare_service_model";
export interface Doctor {
  doctorId: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  contactNumber: string;
  altContactNumber: string;
  emailId: string;
  password: string;
  securityQue: string;
  securityAns : string;
  address1: string;
  address2: string;
  city: string;
  rating: any;
  state: string;
  zipcode: number;
  degree: string;
  speciality: string;
  workHours: number;
  hospitalName: string;
  medicareServiceId: number;
  license:String
}

