export interface Patient {
  patientId: number;
  firstName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  contactNumber: string;
  altContactNumber: string;
  emailId: string;
  password: string;
  securityQuestion: string;
  securityAnswer: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: number;
  approve: boolean;
}
