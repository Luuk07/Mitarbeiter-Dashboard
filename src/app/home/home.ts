import { Component } from '@angular/core';
import { EmployeesListComp } from "./employees-list-comp/employees-list-comp";

@Component({
  selector: 'app-home',
  imports: [EmployeesListComp],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
