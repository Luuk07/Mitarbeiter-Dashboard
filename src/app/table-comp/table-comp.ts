import { Component, inject, Input, ViewChild } from '@angular/core';
import { ShareDataService } from '../create-comp/share-data-service';
import {MatTableModule} from '@angular/material/table';
import{DatePipe} from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatSort, Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { CommonModule } from '@angular/common';
import { ShareFilterService } from '../filter-comp/share-filter-service';





@Component({
  selector: 'app-table-comp',
  imports: [MatTableModule, DatePipe, MatSortModule, MatSort, CommonModule],
  templateUrl: './table-comp.html',
  styleUrl: './table-comp.css'
})
export class TableComp {

  readonly filterService = inject(ShareFilterService);
  employees: I_ifEmployee[] = [];

  // Injecting the ShareDataService to access employee data
  readonly emp = inject(ShareDataService)
  // Data source for the table
  dataSource = new MatTableDataSource(this.emp.allEmployees);
  
  // Columns to be displayed
  displayedColumns: string[] = ['gender', 'name', 'birthday', 'email', 'phoneNumber', 'department', 'isActive', 'age', 'today', 'delete'];
   
  // Acces to the MatSort directive from the template
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _route: Router,
    public _shareDataService:ShareDataService
  ) {}  

  // Datasource get the knowledge of sorting after view initialization
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  onEdit(employee: I_ifEmployee): void {
    this._route.navigate(['/create'], {queryParams: {employeeID: employee?.id?.toString()}});
  }


}
