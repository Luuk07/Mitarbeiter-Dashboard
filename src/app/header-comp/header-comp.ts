import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../create-comp/share-data-service';
import { ShareFilterService } from '../filter-comp/share-filter-service';
import { ApiService } from '../services/api-service';
import { I_ifEmployee } from '../models/interfaces/employee.model';
import { get } from 'http';

// Header with routing links
@Component({
  selector: 'app-header-comp',
  imports: [RouterLink],
  templateUrl: './header-comp.html',
  styleUrl: './header-comp.css'
})
export class HeaderComp implements OnInit{
  readonly data = inject(ShareDataService)
  readonly filter = inject(ShareFilterService)
  readonly router = inject(Router);


  employees: I_ifEmployee[] = [];
  filteredEmployees: I_ifEmployee[] = this.filter.filteredEmployees;
  constructor(private _apiService:ApiService) {

  }

  // Check current route
  isOnCreate(): boolean
  {
    return this.router.url.startsWith('/create')
  }
   isOnStatistic(): boolean
  {
    return this.router.url.startsWith('/statistic')
  }
  isOnTable(): boolean
  {
    
    return this.router.url.startsWith('/table')
  }
  isOnHome(): boolean
  {
  
    return this.router.url.startsWith('/home') || this.router.url === '/'
  }

  getEmployee() {
    this._apiService.allEmployees$.subscribe((_employees) => {
      // console.log('Employees in header', _employees);
      return this.employees = _employees;
    });
  }
  
  ngOnInit() {
    this.router.events.subscribe(() => {
      this.getEmployee();
    });
  }
}
