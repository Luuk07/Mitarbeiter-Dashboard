import { Component, OnInit, inject } from '@angular/core';
import { EmployeeComp } from "../employee-comp/employee-comp";
import { ShareDataService } from '../../create-comp/share-data-service';
import { I_ifEmployee } from '../../models/interfaces/employee.model';
import { ShareFilterService } from '../../filter-comp/share-filter-service';
import { ApiService } from '../../services/api-service';
import { MatDialog } from '@angular/material/dialog';
import { DelConfirmationPopup } from '../del-confirmation-popup/del-confirmation-popup';

// List of all Employees 
@Component({
  selector: 'app-employees-list-comp',
  imports: [EmployeeComp],
  templateUrl: './employees-list-comp.html',
  styleUrl: './employees-list-comp.css'
})
export class EmployeesListComp implements OnInit{
   readonly filterService = inject(ShareFilterService)
   constructor(
    public _apiService:ApiService,
    private _matDialog: MatDialog
  ){}
   //List with employyes
   employees: I_ifEmployee[] = [];
   
   ngOnInit() {
     this.addFromService()
   }

  //Take Data from service
  addFromService() {

    this._apiService.allEmployees$.subscribe((_employees: I_ifEmployee[]) => {
      this.employees = _employees;
    });

    // const newEmployees = this._shareDataService.allEmployees;
    // if (newEmployees) {
    //   this.employees = newEmployees;
    // }
  }

  onEmployeeDeleted(_employeeId: number): void {
    

    //Open Dialog Component
    this._matDialog.open(DelConfirmationPopup).afterClosed().subscribe((result) => {
      
      //If on 'Ja' 
      if (result) {
        console.log('employeeId', _employeeId);
        // 1. Remove from All Emloyees List
        // this._shareDataService.allEmployees = this._shareDataService.allEmployees?.filter(emp => emp.id !== employeeId);
    

        // Speichere das aktuelle Array aller Mitarbeiter als JSON-String im localStorage unter dem Schlüssel 'employees',
        // damit die Daten auch nach einem Seitenneuladen im Browser erhalten bleiben.
        // Der Schlüssel ist der Name worunter die Daten im local Storage gespeichert werden.

        //localStorage.setItem('employees', JSON.stringify(this._shareDataService.allEmployees));
        this._apiService.deleteEmployeeById(_employeeId);
        
        
      }
    });
  }
}
