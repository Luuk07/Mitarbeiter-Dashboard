import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComp } from "./header-comp/header-comp";
import { FilterComp } from "./filter-comp/filter-comp";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComp, FilterComp],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('MitarbeiterDashboard');
}
