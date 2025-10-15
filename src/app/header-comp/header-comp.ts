import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Header with routing links
@Component({
  selector: 'app-header-comp',
  imports: [RouterLink],
  templateUrl: './header-comp.html',
  styleUrl: './header-comp.css'
})
export class HeaderComp {

  readonly router = inject(Router);

  isOnCreate(): boolean
  {
    return this.router.url === '/create';
  }

}
