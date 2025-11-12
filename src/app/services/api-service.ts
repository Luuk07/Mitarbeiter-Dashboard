import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5085';

  //BehavorSubject to hold all employees
  allEmployeesSubject = new BehaviorSubject<I_ifEmployee[]>([]);
  allEmployees$ = this.allEmployeesSubject.asObservable();

  allEmployees: I_ifEmployee[] = [];

  constructor(
    private _http: HttpClient
  ) { 
    
   // this.getEmployeeesAPI();

    this.getAllEmployees();

    //this.postEmployee();


  }

  getEmployeeesAPI() {
    console.log('API Method called');
    
    this._http.get(`${this.apiUrl}/api/employees`).subscribe(data => {
      console.log('data',data);
      
    })
  }


  //Fetch all Employees from JSON Server
  getAllEmployees() {
    this._http.get<I_ifEmployee[]>(`${this.apiUrl}/api/employees`).subscribe(
      {next: (employees: I_ifEmployee[]) => {
      console.log('employees',employees);
      
      this.allEmployeesSubject.next(employees);
      this.allEmployees = employees;
    }, error: (error) => {
      console.error('Error fetching employees:', error);
    }}
    );
  }
  //Fetch Employee by ID
  getEmployeeById(_employeeID: string): Observable<I_ifEmployee> {
    return this._http.get<I_ifEmployee>(`${this.apiUrl}/api/employees/${_employeeID}`);
  }
  //Add new Employee to JSON Server
  addNewEmployee(_employee: I_ifEmployee) {
    console.log('_employee',_employee);
    
    this._http.post<I_ifEmployee>(`${this.apiUrl}/api/employee`, _employee).subscribe({
      next: () => {
        console.log(' Neuer Employee hinzugefügt');
        this.getAllEmployees();
      },
      error: (err) => {
        console.error('Fehler beim Hinzufügen:', err);
      },
      
    });
  }

//Update Employee in JSON Server
updateEmployee(employee: I_ifEmployee) {
  this._http.put<I_ifEmployee>(`${this.apiUrl}/api/employees/${employee.id}`, employee).subscribe({
    next: () => {
      console.log(`Employee ${employee.id} aktualisiert`);
      this.getAllEmployees();
    },
    error: (err) => {
      console.error(`Fehler beim Aktualisieren von ${employee.id}:`, err);
    },
  });
}
//Delete Employee by ID from JSON Server
deleteEmployeeById(employeeId: string) {  
  console.log('employeeId dele',employeeId);
  
  this._http.delete(`${this.apiUrl}/api/employees/${employeeId}`).subscribe({
    next: () => {
      console.log(`Employee ${employeeId} gelöscht`);
      this.getAllEmployees();
    },
    error: (err) => {
      console.error(`Fehler beim Löschen von ${employeeId}:`, err);
    },
  });
}

}
