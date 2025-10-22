import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from '../create-comp/share-data-service';
import { ShareFilterService } from '../filter-comp/share-filter-service';

// Header with routing links
@Component({
  selector: 'app-header-comp',
  imports: [RouterLink],
  templateUrl: './header-comp.html',
  styleUrl: './header-comp.css'
})
export class HeaderComp {
  readonly data = inject(ShareDataService)
  readonly filter = inject(ShareFilterService)
  readonly router = inject(Router);

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

}
