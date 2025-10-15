
import { Injectable} from '@angular/core';
import { I_ifEmployee } from '../models/interfaces/employee.model';


// To save and share employee Data 
@Injectable({
  providedIn: 'root',
})
export class ShareDataService {

  public allEmployees?: I_ifEmployee[] = [
  ];

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


  
}

