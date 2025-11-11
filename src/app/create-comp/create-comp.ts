import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { FormsModule, NgForm } from '@angular/forms';
import { ShareDataService } from './share-data-service';
import { ActivatedRoute } from '@angular/router';
import {Router} from '@angular/router'
import { MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import {MatSelectModule} from '@angular/material/select';
import {MatDialog } from '@angular/material/dialog';
import { RequiredPopup } from './required-popup/required-popup';
import { DatePipe } from '@angular/common';

import {
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../services/api-service';
import { ShareFilterService } from '../filter-comp/share-filter-service';

//Create the employee
@Component({
  selector: 'app-create-comp',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, 
  MatInputModule, MatDatepickerModule, 
  MatNativeDateModule, ReactiveFormsModule, MatSelectModule, DatePipe],
  templateUrl: './create-comp.html',
  styleUrl: './create-comp.css'
})
export class CreateComp {
  //Inject Services
  readonly dataService = inject(ShareDataService);
  readonly dialog = inject(MatDialog);
  readonly filterService = inject(ShareFilterService);
  //Inject router
  readonly route = inject(ActivatedRoute)

  constructor(
    private _route: Router,
    private _apiService: ApiService
  ){}

  // Event emitter to notify parent component of employee creation
  @Output() employee = new EventEmitter<I_ifEmployee>();

  
  confirmed: boolean = false;
  reseted: boolean = false;

  //Employee attributes
  today: Date = new Date();
  id = null;
  birthday: Date = new Date();
  age = 0;
  name= '';
  email? = '';
  gender = '';
  phoneNumber? = null;
  department = '';
  isActive = false;


  maxlength: number = 64;
  

  //On Confirm Button
  onConfirm(form: NgForm) {
    this.confirmed = true;
    console.log('form:', form.value);
   
    //Save all Errors
    const errors = [];

    //Error handler
  
    if(!this.name || this.name.trim() === '')
    {
      errors.push('Bitte gib einen Namen ein');
      this.dataService.missingValues.push('Name');
    }
    if(!this.email || this.email.trim() === '')
    {
     errors.push('Bitte gib eine Email ein');
     this.dataService.missingValues.push('Email');
    }
    if(!this.email.includes('@'))
    {
      errors.push('Ungültige Email: Kein @ enthalten')
    }
    if(this.department === '')
    {
      errors.push('Bitte gib eine Abteilung an');
      this.dataService.missingValues.push('Abteilung');
    }
    if(this.gender === '')
    {
      errors.push('Bitte gib ein Geschlecht an');
      this.dataService.missingValues.push('Geschlecht');
    }
    if(this.phoneNumber === null)
    {
      errors.push('Bitte gib deine Telefonnumer an');
      this.dataService.missingValues.push('Telefonnummer');
    }

    // If required fields are missing, open RequiredPopup dialog
    if(!this.name || !this.name.trim() || 
      !this.email || !this.email.trim() ||
      !this.department || !this.gender || this.phoneNumber === null
      || !this.email.includes('@'))
      {
        this.dialog.open(RequiredPopup).afterClosed().subscribe(() => {
          this.dataService.missingValues = [];
          return;
        }) 
    }

    // If more than 0 errors -> employee cant be created 
    if (errors.length > 0) {
      console.log(errors.join(', '));
      return;
    }
    // save name in lowercase for filtering
    this.name = this.name.toLowerCase();

    
    
    // Determine whether to add a new employee or update an existing one
    if (this.id !== null) {
      this.updateExistingEmployee();
    } else {
      this.addNewEmployee();
    }
  

    // save name in lowercase for filtering
    this.name = this.name.toLowerCase();
  
    //route back to last side
    this._route.navigate([this.dataService.lastRoute]);

  }

  //Update or Add Employee
  getUpdateOrAddEmployee() {
    const id = this.id ? this.id : Date.now();

    //Take over the data from input fields    
    const employeeData: I_ifEmployee = {
      id: id.toString(),
      name: this.name,
      gender: this.gender,
      email: this.email,
      phoneNumber: this.phoneNumber,
      dateOfBirth: this.birthday,
      department: this.department,
      isActive: this.isActive,
      today: this.today,
      age: this.age,
      photoPath: ''
    };

    //calculate age
    this.birthday = new Date(employeeData.dateOfBirth);
    this.today = new Date(employeeData.today);
    employeeData.age = this.today.getFullYear() - this.birthday.getFullYear();

    return employeeData;
  }

  // Add new Employee
  addNewEmployee() {
    let employeeData: I_ifEmployee = this.getUpdateOrAddEmployee();

    this._apiService.addNewEmployee(employeeData);
  }
  // Update existing Employee
  updateExistingEmployee() {
    this._apiService.updateEmployee(this.getUpdateOrAddEmployee());
  }

  
  //Get data from employee who you want to edit 
  ngOnInit() {
    if (!this.route) {
      console.error('route is undefined!');
    }
    else{
      this.route.queryParams.subscribe(params => {
        
        if (params['employeeID']) {
            const currentEmployeeID = Number(params['employeeID']);

            this._apiService.getEmployeeById(currentEmployeeID.toString()).subscribe((_employee: I_ifEmployee) => {
              if (_employee) {
                  this.setEmployeeAttributes(_employee);

              }
              
            })
          }
        });
      
    }
  }


  //Set Employee attributes
  setEmployeeAttributes(_employee?: I_ifEmployee) {
    if (_employee) {
      this.id = _employee.id;
      this.name= _employee.name;
      this.email = _employee.email;
      this.gender = _employee.gender;
      this.phoneNumber = _employee.phoneNumber;
      this.department = _employee.department;
      this.isActive = _employee.isActive;
      this.birthday = new Date(_employee.dateOfBirth);
    }

   
    
  }

  // Break up and route back
  onBreakUp()
  {
    this.id = Date.now();
    this.birthday = new Date();
    this.name= '';
    this.email = '';
    this.gender = '';
    this.phoneNumber = 0;
    this.department = '';
    this.isActive = false;
    this._route.navigate([this.dataService.lastRoute]);
  }

  onReset()
  {
    this.confirmed = true;
    this.id = null;
    this.birthday = new Date();
    this.name= '';
    this.email = '';
    this.phoneNumber = null;
    this.gender = '';
    this.department = '';
    this.isActive = false;
  }


  
  

}
