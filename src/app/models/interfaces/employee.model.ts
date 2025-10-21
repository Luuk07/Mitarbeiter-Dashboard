
//Interface for Employee
export interface I_ifEmployee{
  id:number;
  name:string;
  gender:string;
  email?:string;
  phoneNumber?: number;
  dateOfBirth:Date;
  department:string;
  isActive:boolean;
  photoPath?:string;
  age?:number;
  today?:Date;
}