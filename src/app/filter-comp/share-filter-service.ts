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
  readonly router = inject(Router);
  allEmployees: I_ifEmployee[] = [];
  

  constructor(private _apiService : ApiService) { 
    this.getAllEmployees();
    this.router.events.subscribe(() => {
      this.getAllEmployees();
    });
   
  }

  

  getAllEmployees() {
    this._apiService.allEmployees$.subscribe((_employees: I_ifEmployee[]) => {
      this.allEmployees = _employees;
    });
  }

  readonly service = inject(ShareDataService)
  filterValueGender: string = 'alle';
  filterValueDepartment: string = 'alle';
  filterValueIsActive: boolean;
  filterValueName: string = '';
   
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


  get filteredEmployees() {
    return this.allEmployees.filter(emp =>
      (this.filterValueGender === 'alle' || emp.gender === this.filterValueGender) &&
      (this.filterValueDepartment === 'alle' || emp.department === this.filterValueDepartment) &&
      (this.filterValueIsActive === undefined || emp.isActive === this.filterValueIsActive)
    );
  }

 

  

   
}
