import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3001';


  allEmployeesSubject = new BehaviorSubject<I_ifEmployee[]>([]);
  allEmployees$ = this.allEmployeesSubject.asObservable();

  allEmployees: I_ifEmployee[] = [];

  constructor(
    private _http: HttpClient
  ) { 

    this.getAllEmployees();
    
  }

  getAllEmployees() {
    this._http.get<I_ifEmployee[]>(`${this.apiUrl}/employees`).subscribe(
      {next: (employees: I_ifEmployee[]) => {
      console.log('employees',employees);
      
      this.allEmployeesSubject.next(employees);
      this.allEmployees = employees;
    }, error: (error) => {
      console.error('Error fetching employees:', error);
    }}
    );
  }

  getEmployeeById(_employeeID: string): Observable<I_ifEmployee> {
    return this._http.get<I_ifEmployee>(`${this.apiUrl}/employees/${_employeeID}`);
  }

addNewEmployee(_employee: I_ifEmployee) {
  console.log('_employee',_employee);
  
  this._http.post<I_ifEmployee>(`${this.apiUrl}/employees`, _employee).subscribe({
    next: () => {
      console.log(' Neuer Employee hinzugefügt');
      this.getAllEmployees();
    },
    error: (err) => {
      console.error('Fehler beim Hinzufügen:', err);
    },
    
  });
}

updateEmployee(employee: I_ifEmployee) {
  this._http.put<I_ifEmployee>(`${this.apiUrl}/employees/${employee.id}`, employee).subscribe({
    next: () => {
      console.log(`Employee ${employee.id} aktualisiert`);
      this.getAllEmployees();
    },
    error: (err) => {
      console.error(`Fehler beim Aktualisieren von ${employee.id}:`, err);
    },
  });
}

deleteEmployeeById(employeeId: string) {
  this._http.delete(`${this.apiUrl}/employees/${employeeId}`).subscribe({
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
