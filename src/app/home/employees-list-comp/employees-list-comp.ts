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
  }

  //On Employee Deleted
  onEmployeeDeleted(_employeeId: string): void {
    

    //Open Dialog Component
    this._matDialog.open(DelConfirmationPopup).afterClosed().subscribe((result) => {
      
      //If on 'Ja' 
      if (result) {
        console.log('employeeId', _employeeId);
        this._apiService.deleteEmployeeById(_employeeId.toString());
      }
    });
  }
}
