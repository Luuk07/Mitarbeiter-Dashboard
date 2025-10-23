import { Component, ViewEncapsulation, Input, OnInit, inject, Output, EventEmitter} from '@angular/core';
import { I_ifEmployee } from '../../models/interfaces/employee.model';
import { ShareDataService } from '../../create-comp/share-data-service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DelConfirmationPopup } from '../del-confirmation-popup/del-confirmation-popup';
import {MatTableModule} from '@angular/material/table';
import { ApiService } from '../../services/api-service';
import { ShareFilterService } from '../../filter-comp/share-filter-service';


//Employee Component
@Component({
  selector: 'app-employee-comp',
  imports: [DatePipe, CommonModule, MatButtonModule, MatTableModule],
  templateUrl: './employee-comp.html',
  styleUrl: './employee-comp.css',
  encapsulation: ViewEncapsulation.None  
})
export class EmployeeComp implements OnInit {
  //Dialog get instanz of MatDialog
  //MatDialog = Is the the service for modale dialogs like the Confirmation Dialog
  filterService = inject(ShareFilterService);
  readonly dialog = inject(MatDialog)
  readonly router = inject(Router)
  @Input() employee?: I_ifEmployee;

  @Output() onEmployeeDeleted = new EventEmitter<number>();
  


  constructor(
  private _route: Router,
  private _apiService:ApiService
) {}

  ngOnInit(): void {
  }

  // On Delete Button
  onDelete(employeeId: number, element: HTMLElement): void {
    this.onEmployeeDeleted.emit(employeeId);
  }

  // Navigate to Create Site with employee Data
  navigate2Route() {
    console.log('this.employee?.id',this.employee?.id);
    this._route.navigate(['/create'], {queryParams: {employeeID: this.employee?.id?.toString()}});
  }

  
 
}
