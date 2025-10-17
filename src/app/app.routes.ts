import { Routes } from '@angular/router';
import path from 'path';
import { Home } from './home/home';
import { CreateComp } from './create-comp/create-comp';
import { EmployeeStatistics } from './employee-statistics/employee-statistics';

// Define the routes for the application


export const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'create', component: CreateComp},
  {path: 'statistic', component: EmployeeStatistics}
];
