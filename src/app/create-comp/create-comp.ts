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
    private _route: Router
  ){}


  @Output() employee = new EventEmitter<I_ifEmployee>();
  maxlength: number= 30;

  //Employee attributes
  id = Date.now();
  birthday: Date = new Date();
  name= '';
  email? = '';
  gender = '';
  phonenumber? = 0;
  department = '';
  isActive = false;

  //On Confirm Button
  onConfirm(){
 
    // Prüft, ob this.id null oder undefined ist -> dann wird eine neue ID mit Date.now() erstellt
    // Ansonsten wird die vorhandene this.id genommen
    const id = this.id ?? Date.now();

    //Take over the data from input fields    
    const employeeData: I_ifEmployee = {
      id: id,
      name: this.name,
      gender: this.gender,
      email: this.email,
      phoneNumber: this.phonenumber,
      dateOfBirth: this.birthday,
      department: this.department,
      isActive: this.isActive,
      photoPath: '',
    };


    //Save all Errors
    const errors = [];

    //Error handler
  
    if(!employeeData.name || employeeData.name.trim() === '')
    {
      errors.push('Bitte gib einen Namen ein');
    }
    if(!employeeData.email || employeeData.email.trim() === '')
    {
     errors.push('Bitte gib eine Email ein');
    }
    if(!employeeData.email.includes('@'))
    {
      errors.push('Ungültige Email: Kein @ enthalten')
    }
    if(employeeData.department === '')
    {
      errors.push('Bitte gib eine Abteilung an');
    }
    if(employeeData.gender === '')
    {
      errors.push('Bitte gib ein Geschlecht an');
    }
    if(employeeData.phoneNumber === null)
    {
      errors.push('Bitte gib deine Telefonnumer an');
    }
    console.log("employeeData.phoneNumber", employeeData.phoneNumber)

    if(!employeeData.name || !employeeData.name.trim() || 
      !employeeData.email || !employeeData.email.trim() ||
      !employeeData.department || !employeeData.gender || employeeData.phoneNumber === null
      || !employeeData.email.includes('@')){
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
    const index = this._shareDataService.allEmployees.findIndex(emp => emp.id === employeeData.id);
    if (index !== -1) {
      this._shareDataService.allEmployees[index] = employeeData;
    } 
    else{
      this._shareDataService.allEmployees.push(employeeData);
    }

    // Speichere das aktuelle Array aller Mitarbeiter als JSON-String im localStorage unter dem Schlüssel 'employees',
    // damit die Daten auch nach einem Seitenneuladen im Browser erhalten bleiben.
    // Der Schlüssel ist der Name worunter die Daten im local Storage gespeichert werden.
    localStorage.setItem('employees', JSON.stringify(this._shareDataService.allEmployees));

    // save name in lowercase for filtering
    employeeData.name = this.name.toLowerCase();

    //route to home site
    this._route.navigate(['/home']);

  }

  
  //Get data from employee who you want to edit 
  ngOnInit() {
    if (!this.route) {
      console.error('route is undefined!');
    }
    else{
      this.route.queryParams.subscribe(params => {
        
        if(params['employeeID']) {
          const currentEmployeeID = Number(params['employeeID']);

          let selectedEmployee = this.getEmployeeByID(currentEmployeeID);
          console.log('selectedEmployee',selectedEmployee);

          if (selectedEmployee) this.setEmployeeAttributes(selectedEmployee);
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
      this.phonenumber = _employee.phoneNumber;
      this.department = _employee.department;
      this.isActive = _employee.isActive;
      this.birthday = _employee.dateOfBirth;
    }
  }

  // Get emlpoyee by ID
  getEmployeeByID(_employeeID: number) {
    return this._shareDataService.allEmployees?.find((clEmployee: I_ifEmployee) => clEmployee.id === _employeeID);
  }
  // On Break Up Button -> default data
  onBreakUp()
  {
    this.id = Date.now();
    this.birthday = new Date();
    this.name= '';
    this.email = '';
    this.gender = '';
    this.phonenumber = 0;
    this.department = '';
    this.isActive = false;
    this._route.navigate(['/home']);
  }

}
