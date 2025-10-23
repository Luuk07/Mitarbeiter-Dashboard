import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { FormsModule } from '@angular/forms';
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

import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ApiService } from '../services/api-service';

//Create the employee
@Component({
  selector: 'app-create-comp',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, 
  MatInputModule, MatDatepickerModule, 
  MatNativeDateModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './create-comp.html',
  styleUrl: './create-comp.css'
})
export class CreateComp {

  readonly dialog = inject(MatDialog);

  constructor(
    private _shareDataService: ShareDataService, 
    private route: ActivatedRoute,
    private _route: Router,
    private _apiService: ApiService
  ){}


  @Output() employee = new EventEmitter<I_ifEmployee>();
  maxlength: number= 30;

  //Employee attributes
  today: Date = new Date();
  id = null;
  birthday: Date = new Date();
  age = 0;
  name= '';
  email? = '';
  gender = '';
  phoneNumber? = 0;
  department = '';
  isActive = false;

  //On Confirm Button
  onConfirm() {
    // Prüft, ob this.id null oder undefined ist -> dann wird eine neue ID mit Date.now() erstellt
    // Ansonsten wird die vorhandene this.id genommen
    
    //Save all Errors
    const errors = [];

    //Error handler
  
    if(!this.name || this.name.trim() === '')
    {
      errors.push('Bitte gib einen Namen ein');
    }
    if(!this.email || this.email.trim() === '')
    {
     errors.push('Bitte gib eine Email ein');
    }
    if(!this.email.includes('@'))
    {
      errors.push('Ungültige Email: Kein @ enthalten')
    }
    if(this.department === '')
    {
      errors.push('Bitte gib eine Abteilung an');
    }
    if(this.gender === '')
    {
      errors.push('Bitte gib ein Geschlecht an');
    }
    if(this.phoneNumber === null)
    {
      errors.push('Bitte gib deine Telefonnumer an');
    }

    console.log('this.birthday',this.birthday);
    
    if((this.birthday.getDate() > this.today.getDate())){
      errors.push('Dein Geburtstag kann nicht in der Zukunft liegen!');
    }
   

    if(!this.name || !this.name.trim() || 
      !this.email || !this.email.trim() ||
      !this.department || !this.gender || this.phoneNumber === null
      || !this.email.includes('@') || (this.birthday.getDate() > this.today.getDate()))
      {
        this.dialog.open(RequiredPopup).afterClosed().subscribe(() => {
          return;
        }) 
        
    }


   

    // If more than 0 errors -> employee cant be created 
    if (errors.length > 0) {
      console.log(errors.join(', '));
      return;
    }

    //check if current employee should get edited or new created
    // const index = this._shareDataService.allEmployees.findIndex(emp => emp.id === employeeData.id);
    // if (index !== -1) {
    //   this._shareDataService.allEmployees[index] = employeeData;
    // } 
    // else{
    //   this._shareDataService.allEmployees.push(employeeData);
    // }

    this.name = this.name.toLowerCase();

    console.log('this.id',this.id);
    

    if (this.id !== null) {
      this.updateExistingEmployee();
    } else {
      this.addNewEmployee();
    }
    // Speichere das aktuelle Array aller Mitarbeiter als JSON-String im localStorage unter dem Schlüssel 'employees',
    // damit die Daten auch nach einem Seitenneuladen im Browser erhalten bleiben.
    // Der Schlüssel ist der Name worunter die Daten im local Storage gespeichert werden.

    //localStorage.setItem('employees', JSON.stringify(this._shareDataService.allEmployees));
    // if(!this.id) {
    //   console.log('in Post');
    //   this._apiService.addNewEmployee(employeeData).subscribe((newEmployee: I_ifEmployee) => {
    //     console.log('Neuer Mitarbeiter hinzugefügt:', newEmployee);
    //   });
    // } else {
    //   console.log('this.id', this.id);
    //   console.log('in Put');
    //   this._apiService.updateEmployee(employeeData).subscribe((updatedEmployee: I_ifEmployee) => {
    //     console.log('Mitarbeiter aktualisiert:', updatedEmployee);
    //   });
    // }

    // save name in lowercase for filtering
    this.name = this.name.toLowerCase();

    //route to home site
    this._route.navigate(['/home']);

  }

  getUpdateOrAddEmployee() {
    const id = this.id ? this.id : Date.now();

    //Take over the data from input fields    
    const employeeData: I_ifEmployee = {
      id: id,
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


  addNewEmployee() {
    let employeeData: I_ifEmployee = this.getUpdateOrAddEmployee();

    this._apiService.addNewEmployee(employeeData).subscribe((newEmployee: I_ifEmployee) => { 
      console.log('Neuer Mitarbeiter hinzugefügt:', newEmployee);
    });
  }

  updateExistingEmployee() {
    this._apiService.updateEmployee(this.getUpdateOrAddEmployee()).subscribe((updatedEmployee: I_ifEmployee) => {
      console.log('Mitarbeiter aktualisiert:', updatedEmployee);
    });
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

            this._apiService.getEmployeeById(currentEmployeeID).subscribe((_employee: I_ifEmployee) => {
              if (_employee) {
                // let selectedEmployee = this.getEmployeeByID(currentEmployeeID);
                // console.log('selectedEmployee',selectedEmployee);
    
                // if (selectedEmployee) 
                  this.setEmployeeAttributes(_employee);

              }
              
            })
              // return this._shareDataService.allEmployees?.find((clEmployee: I_ifEmployee) => clEmployee.id === _employeeID);


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

    console.log('employee to edit', _employee);
    
  }

  // Get emlpoyee by ID
  // getEmployeeByID(_employeeID: number) {
  //   this._apiService.getEmployeeById(_employeeID).subscribe((_employee: I_ifEmployee) => {
  //     return _employee;
  //   })
  //   // return this._shareDataService.allEmployees?.find((clEmployee: I_ifEmployee) => clEmployee.id === _employeeID);
  // }
  // On Break Up Button -> default data
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
    this._route.navigate(['/home']);
  }

}
