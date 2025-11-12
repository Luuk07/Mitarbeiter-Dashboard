
//Interface for Employee
export interface I_ifEmployee{
  id:string;
  name:string;
  gender:string;
  email?:string;
  phoneNumber?: string;
  dateOfBirth:Date;
  department:string;
  isActive:boolean;
  photoPath?:string;
  age?:number;
  today?:Date;
}