import { Component, inject} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ShareDataService } from '../../create-comp/share-data-service';
import { ShareFilterService } from './share-filter-service';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // mat-option ist im core!
import { I_ifEmployee } from '../../models/interfaces/employee.model';


@Component({
  selector: 'app-filter-comp',
  imports: [MatFormFieldModule,
    MatSelectModule,
    MatOptionModule, 
    MatCheckboxModule],
  templateUrl: './filter-comp.html',
  styleUrl: './filter-comp.css'
})
export class FilterComp {
  readonly service = inject(ShareDataService)
  readonly filterService = inject(ShareFilterService)
  dataSource = new MatTableDataSource(this.service.allEmployees);
  selectedGender = 'alle';
  selectedDepartment = 'alle';
  isAktiv: boolean;

  constructor() {
    this.dataSource = new MatTableDataSource(this.service.allEmployees);
    this.dataSource.filterPredicate = (data: I_ifEmployee, filter: string) => {
    if (!filter) return true; // Wenn leer, alles zeigen
    console.log('Filter:', filter);
    return data.gender.toLowerCase().includes(filter) && data.department.toLowerCase().includes(filter);

  }
}

  applyFilterGender(filterValue: string) 
  { 
    this.dataSource.filter = filterValue
    this.filterService.setFilterGendner(filterValue);
  }

  applyFilterDepartment(filterValue: string) 
  { 
    this.dataSource.filter = filterValue
    this.filterService.setFilterDepartment(filterValue);
  }
  applyFilterIsActive(filterValue: boolean) { 
    if(filterValue === undefined){
      this.filterService.setFilterIsActive(undefined);
    }else{
      this.dataSource.filter = filterValue.toString();
      this.filterService.setFilterIsActive(filterValue);
    }

  }

}




