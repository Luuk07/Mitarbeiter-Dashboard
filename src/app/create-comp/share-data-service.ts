
import { Injectable } from '@angular/core';
import { I_ifEmployee } from '../models/interfaces/employee.model';

// To save and share employee Data 
@Injectable({
  providedIn: 'root',
})
export class ShareDataService {
  public allEmployees?: I_ifEmployee[] = [
  ];
}
