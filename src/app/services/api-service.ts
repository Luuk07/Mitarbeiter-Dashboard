import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';


  allEmployeesSubject = new BehaviorSubject<I_ifEmployee[]>([]);
  allEmployees$ = this.allEmployeesSubject.asObservable();

  allEmployees: I_ifEmployee[] = [];

  constructor(
    private _http: HttpClient
  ) { 

    this.getAllEmployees();
    
  }

  getAllEmployees() {
    this._http.get<I_ifEmployee[]>(`${this.apiUrl}/employees`).subscribe((employees: I_ifEmployee[]) => {
      console.log('employees',employees);
      
      this.allEmployeesSubject.next(employees);
      this.allEmployees = employees;
    });
  }

  getEmployeeById(_employeeID: number): Observable<I_ifEmployee> {
    return this._http.get<I_ifEmployee>(`${this.apiUrl}/employees/${_employeeID}`);
  }

  addNewEmployee(_employee: I_ifEmployee) {
    this._http.post<I_ifEmployee>(`${this.apiUrl}/employees`, _employee).subscribe(() => {
      this.getAllEmployees();
    });
  }

  updateEmployee(employee: I_ifEmployee) {
    this._http.put<I_ifEmployee>(`${this.apiUrl}/employees/${employee.id}`, employee).subscribe(() => {
      this.getAllEmployees();
    });
  }

   deletEmployeeById(employeeId: number) {
    this._http.delete<I_ifEmployee>(`${this.apiUrl}/employees/${employeeId}`).subscribe(() => {
      this.getAllEmployees();
    });;
  }


  
}
