import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { I_ifEmployee } from '../models/interfaces/employee.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private _http: HttpClient
  ) { }

  getAllEmployees(): Observable<I_ifEmployee[]> {
    return this._http.get<I_ifEmployee[]>(`${this.apiUrl}/employees`);
  }

  getEmployeeById(_employeeID: number): Observable<I_ifEmployee> {
    return this._http.get<I_ifEmployee>(`${this.apiUrl}/employees/${_employeeID}`);
  }

  addNewEmployee(_employee: I_ifEmployee): Observable<I_ifEmployee> {
    return this._http.post<I_ifEmployee>(`${this.apiUrl}/employees`, _employee);
  }

  updateEmployee(employee: I_ifEmployee): Observable<I_ifEmployee> {
    return this._http.put<I_ifEmployee>(`${this.apiUrl}/employees/${employee.id}`, employee);
  }

   deletEmployeeById(employeeId: number): Observable<I_ifEmployee> {
    return this._http.delete<I_ifEmployee>(`${this.apiUrl}/employees/${employeeId}`);
  }


  
}
