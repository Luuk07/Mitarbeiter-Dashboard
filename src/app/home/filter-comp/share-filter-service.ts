import { Injectable, inject } from '@angular/core';
import { ShareDataService } from '../../create-comp/share-data-service';

@Injectable({
  providedIn: 'root'
})
export class ShareFilterService {
  readonly service = inject(ShareDataService)
  filterValueGender: string = 'alle';
  filterValueDepartment: string = 'alle';
   
  
  setFilterGendner(value: string ) {
    this.filterValueGender = value;
    
  }
  setFilterDepartment(value: string ) {
    this.filterValueDepartment = value;
  }

  // Getter to retrieve filtered employees based on current filter values
  // Getter is to update automatically when filter values change
  get filteredEmployees() {
    return this.service.allEmployees.filter(emp =>
      (this.filterValueGender === 'alle' || emp.gender === this.filterValueGender) &&
      (this.filterValueDepartment === 'alle' || emp.department === this.filterValueDepartment));
  }
}
