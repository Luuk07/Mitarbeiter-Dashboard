import { ChangeDetectorRef, Injectable, inject } from '@angular/core';
import { ShareDataService } from '../create-comp/share-data-service';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { ApiService } from '../services/api-service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';


//Service to share filter values between components
@Injectable({
  providedIn: 'root'
})
export class ShareFilterService {
  //Inject router and services
  readonly router = inject(Router);
  readonly service = inject(ShareDataService)

  allEmployees: I_ifEmployee[] = [];
  

  constructor(private _apiService : ApiService) { 
    this.getAllEmployees();
    this.router.events.subscribe(() => {
      this.getAllEmployees();
    });
   
  }

  
  // Fetch all employees from the API service
  getAllEmployees() {
    this._apiService.allEmployees$.subscribe((_employees: I_ifEmployee[]) => {
      this.allEmployees = _employees;
    });
  }

  // Filter values
  filterValueGender: string = 'alle';
  filterValueDepartment: string = 'alle';
  filterValueIsActive: boolean;
  filterValueName: string = '';
  filterValueAgeGroup: {min: number, max?: number};
   
  // Setter methods to update filter values
  setFilterGendner(value: string ) {    
    this.filterValueGender = value;
    
  }
  setFilterDepartment(value: string ) {
    this.filterValueDepartment = value;
  }
  setFilterIsActive(value: boolean ) {
    this.filterValueIsActive = value;
  }

  setFilterName(value: string ) {
    this.filterValueName = value;
  }
  setFilterAgeGroup(value: {min: number, max?: number} ) {
    console.log('value', value);
    this.filterValueAgeGroup = value;
  }

  // Get filtered employees based on current filter values
  get filteredEmployees() {
    return this.allEmployees.filter(emp =>{
      const ageGroup = this.filterValueAgeGroup;
      const inAgeGroup = !ageGroup || (emp.age >= ageGroup.min && emp.age < (ageGroup.max ?? Infinity));
      return(
      (this.filterValueGender === 'alle' || emp.gender === this.filterValueGender) &&
      (this.filterValueDepartment === 'alle' || emp.department === this.filterValueDepartment) &&
      (this.filterValueIsActive === undefined || emp.isActive === this.filterValueIsActive) &&
      (emp.name.toLowerCase().includes(this.filterValueName.toLowerCase()) && inAgeGroup))
  });
  }

 

  

   
}
