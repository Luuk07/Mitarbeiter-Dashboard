import { AfterViewChecked, AfterViewInit, Component, inject, Input, OnInit, ViewChild } from '@angular/core';
import { ShareDataService } from '../create-comp/share-data-service';
import {MatTableModule} from '@angular/material/table';
import{DatePipe} from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { CommonModule } from '@angular/common';
import { ShareFilterService } from '../filter-comp/share-filter-service';
import { MatDialog } from '@angular/material/dialog';
import { DelConfirmationPopup } from '../home/del-confirmation-popup/del-confirmation-popup';
import { ApiService } from '../services/api-service';





@Component({
  selector: 'app-table-comp',
  imports: [MatTableModule, DatePipe, MatSortModule, MatSort, CommonModule],
  templateUrl: './table-comp.html',
  styleUrl: './table-comp.css'
})
export class TableComp implements OnInit {

  readonly filterService = inject(ShareFilterService);
  readonly dialog = inject(MatDialog);
  employees: I_ifEmployee[] = [];

  // Injecting the ShareDataService to access employee data
 
  // Data source for the table
  dataSource = new MatTableDataSource();
  
  // Columns to be displayed
  displayedColumns: string[] = ['gender', 'name', 'birthday', 'email', 'phoneNumber', 'department', 'isActive', 'age', 'today', 'edit', 'delete'];
   
  // Acces to the MatSort directive from the template
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _route: Router,
    public _shareDataService:ShareDataService,
    private _apiService:ApiService
  ) {}  

  ngOnInit(): void {
    this.onDataSource;
  }
  get onDataSource() {
    this.dataSource.sort = this.sort;
    return new MatTableDataSource(this.filterService.filteredEmployees);
  }


  onEdit(employee: I_ifEmployee): void {
    this._route.navigate(['/create'], {queryParams: {employeeID: employee?.id?.toString()}});
  }
  
  onDelete(employeeId: number, element: HTMLElement): void {
     console.log('Löschen von Mitarbeiter mit ID:', employeeId);
     //Open Dialog Component
     this.dialog.open(DelConfirmationPopup).afterClosed().subscribe((result) => {
       
       //If on 'Ja' 
       if (result) {
        
         this._apiService.deletEmployeeById(employeeId).subscribe((emplpoyee: I_ifEmployee) => {
           console.log(' Mitarbeiter deleted:', emplpoyee);
                 
           // 2. Remove Dom Element
           element.remove();
 
         });
       }
     });
   }
 


}
