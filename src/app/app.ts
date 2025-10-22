import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComp } from "./header-comp/header-comp";
import { FilterComp } from "./filter-comp/filter-comp";
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComp, FilterComp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MitarbeiterDashboard');
  readonly router = inject(Router);

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

}
