import { Component, inject, Input } from '@angular/core';
import { ShareDataService } from '../create-comp/share-data-service';
import {MatTableModule} from '@angular/material/table';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import{DatePipe} from '@angular/common';

@Component({
  selector: 'app-table-comp',
  imports: [MatTableModule, DatePipe],
  templateUrl: './table-comp.html',
  styleUrl: './table-comp.css'
})
export class TableComp {
  readonly emp = inject(ShareDataService)
  dataSource = this.emp.allEmployees;
  displayedColumns: string[] = ['gender', 'name', 'birthday', 'email', 'phoneNumber', 'department', 'isActive', 'age', 'today'];
   
}
