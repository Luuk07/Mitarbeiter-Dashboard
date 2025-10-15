import { Component, ViewEncapsulation, Input, OnInit, inject} from '@angular/core';
import { I_ifEmployee } from '../../models/interfaces/employee.model';
import { ShareDataService } from '../../create-comp/share-data-service';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule} from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DelConfirmationPopup } from '../del-confirmation-popup/del-confirmation-popup';

//Employee Component
@Component({
  selector: 'app-employee-comp',
  imports: [DatePipe, CommonModule, MatButtonModule],
  templateUrl: './employee-comp.html',
  styleUrl: './employee-comp.css',
  encapsulation: ViewEncapsulation.None  
})
export class EmployeeComp implements OnInit {
  //Dialog get instanz of MatDialog
  //MatDialog = Is the the service for modale dialogs like the Confirmation Dialog
  readonly dialog = inject(MatDialog)
 
  @Input() employee?: I_ifEmployee;

  constructor(
  public _shareDataService:ShareDataService,
  private _route: Router
) {}

  ngOnInit(): void {
  }

  // On Delete Button
  onDelete(employeeId: number, element: HTMLElement): void {

    //Open Dialog Component
    this.dialog.open(DelConfirmationPopup).afterClosed().subscribe((result) => {
      
      //If on 'Ja' 
      if (result) {
        console.log('employeeId', employeeId);
        // 1. Remove from All Emloyees List
        this._shareDataService.allEmployees = this._shareDataService.allEmployees?.filter(emp => emp.id !== employeeId);
    
        // 2. Remove Dom Element
        element.remove();
    
        console.log('Updated Employees:', this._shareDataService.allEmployees);
      }
    });
  }

  // Navigate to Create Site with employee Data
  navigate2Route() {
    console.log('this.employee?.id',this.employee?.id);
    
    this._route.navigate(['/create'], {queryParams: {employeeID: this.employee?.id?.toString()}});
  }

  
 
}
