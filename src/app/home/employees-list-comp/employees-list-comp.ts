import { Component, OnInit } from '@angular/core';
import { EmployeeComp } from "../employee-comp/employee-comp";
import { ShareDataService } from '../../create-comp/share-data-service';
import { I_ifEmployee } from '../../models/interfaces/employee.model';

// List of all Employees 
@Component({
  selector: 'app-employees-list-comp',
  imports: [EmployeeComp],
  templateUrl: './employees-list-comp.html',
  styleUrl: './employees-list-comp.css'
})
export class EmployeesListComp implements OnInit{
   constructor(public _shareDataService:ShareDataService){}
   //List with employyes
   employees: I_ifEmployee[] = [];

  ngOnInit() {
    console.log("In ngOnInit")
    this.addFromService()
  }

  //Take Data from service
  addFromService() {
    console.log('rein')
    const newEmployees = this._shareDataService.allEmployees;
    if (newEmployees) {
      this.employees = newEmployees;
    }
  }
}
