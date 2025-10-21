import { Injectable, inject } from '@angular/core';
import { ShareDataService } from '../../create-comp/share-data-service';


//Service to share filter values between components
@Injectable({
  providedIn: 'root'
})
export class ShareFilterService {
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


  // Getter to retrieve filtered employees based on current filter values
  // Getter is to update automatically when filter values change
  get filteredEmployees() {
    return this.service.allEmployees.filter(emp =>
      (this.filterValueGender === 'alle' || emp.gender === this.filterValueGender) &&
      (this.filterValueDepartment === 'alle' || emp.department === this.filterValueDepartment) &&
      (this.filterValueIsActive === undefined || emp.isActive === this.filterValueIsActive)
    );
  }
}
