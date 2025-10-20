import { Component } from '@angular/core';
import { EmployeesListComp } from "./employees-list-comp/employees-list-comp";
import { FilterComp } from "./filter-comp/filter-comp";

@Component({
  selector: 'app-home',
  imports: [EmployeesListComp, FilterComp],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
