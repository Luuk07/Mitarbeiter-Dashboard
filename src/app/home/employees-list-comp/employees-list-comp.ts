import { Component, OnInit, inject } from '@angular/core';
import { EmployeeComp } from "../employee-comp/employee-comp";
import { ShareDataService } from '../../create-comp/share-data-service';
import { I_ifEmployee } from '../../models/interfaces/employee.model';
import { ShareFilterService } from '../../filter-comp/share-filter-service';
import { ApiService } from '../../services/api-service';

// List of all Employees 
@Component({
  selector: 'app-employees-list-comp',
  imports: [EmployeeComp],
  templateUrl: './employees-list-comp.html',
  styleUrl: './employees-list-comp.css'
})
export class EmployeesListComp implements OnInit{
   readonly filterService = inject(ShareFilterService)
   constructor(public _apiService:ApiService){}
   //List with employyes
   employees: I_ifEmployee[] = [];
   
   ngOnInit() {
     this.addFromService()
   }

  //Take Data from service
  addFromService() {

    this._apiService.getAllEmployees().subscribe((_employees: I_ifEmployee[]) => {
      this.employees = _employees;
    });

    // const newEmployees = this._shareDataService.allEmployees;
    // if (newEmployees) {
    //   this.employees = newEmployees;
    // }
  }
}
