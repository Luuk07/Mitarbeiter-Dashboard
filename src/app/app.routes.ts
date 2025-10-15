import { Routes } from '@angular/router';
import path from 'path';
import { Home } from './home/home';
import { CreateComp } from './create-comp/create-comp';


export const routes: Routes = [
  {path: '', component: Home},
  {path: 'home', component: Home},
  {path: 'create', component: CreateComp}
];
