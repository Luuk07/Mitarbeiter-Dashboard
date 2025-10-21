
import { Injectable, OnInit} from '@angular/core';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { T } from '@angular/cdk/keycodes'
import { BehaviorSubject } from 'rxjs';


// To save and share employee Data 
@Injectable({
  providedIn: 'root',
})
export class ShareDataService  {

  public allEmployees?: I_ifEmployee[] = [
  ];
  today = new Date();
  eighteenYearsAgo = new Date(this.today.getFullYear() - 18, this.today.getMonth(), this.today.getDate());
  employeeAktiveCount: number = 0; 
  employeeInAktiveCount: number = 0; 
  employeeFemaleCount: number = 0;
  employeeMaleCount: number = 0;
  employeeDiverseCount: number = 0;
  employeeUnderAgeCount: number = 0;
  emoloyeeOfAgeCount: number = 0;
  
  constructor(){
    if(typeof window !== 'undefined')
    {
     
      const employees = localStorage.getItem('employees');
      console.log('employee', employees);
      if(employees)
      { 
         
         try{
            this.allEmployees = JSON.parse(employees) as I_ifEmployee[];
          }
          catch (error) {
          console.error('Fehler beim Parsen der Employee-Daten aus localStorage:', error);
          this.allEmployees = [];
        }

      }
      else {
        // Falls serverseitig, initialisiere leer oder mit Defaultwerten
        this.allEmployees = [];
      }
    }
    else{
      this.allEmployees = [];
    }
 
   }

   get getEmployeeAktiveCount(){
    return this.employeeAktiveCount = this.allEmployees.filter(emp => emp.isActive).length;
   }
    get getEmployeeInAktiveCount(){
    return  this.employeeInAktiveCount = this.allEmployees.filter(emp => !emp.isActive).length;
   }
    get getEmployeeFemaleCount(){
    return  this.employeeFemaleCount = this.allEmployees.filter(emp => emp.gender === 'Weiblich').length;
   }
    get getEmployeeMaleCount(){
    return  this.employeeMaleCount = this.allEmployees.filter(emp => emp.gender === 'Männlich').length;
   }
    get getEmployeeDiverseCount(){
    return  this.employeeDiverseCount = this.allEmployees.filter(emp => emp.gender === 'Divers').length;
   }
    get getEmployeeUnderAgeCount(){
    return this.employeeUnderAgeCount = this.allEmployees.filter(emp => new Date(emp.dateOfBirth) > this.eighteenYearsAgo).length;
   }
    get getEmoloyeeOfAgeCount(){
    return this.emoloyeeOfAgeCount = this.allEmployees.filter(emp => new Date(emp.dateOfBirth) <= this.eighteenYearsAgo).length;

   }



  
}

