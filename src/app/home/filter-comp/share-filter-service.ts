import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareFilterService {
  filterValueGender: string = 'alle';
  filterValueDepartment: string = 'alle';

  setFilterGendner(value: string ) {
    this.filterValueGender = value;
    
  }
  setFilterDepartment(value: string ) {
    this.filterValueDepartment = value;
  }

}
