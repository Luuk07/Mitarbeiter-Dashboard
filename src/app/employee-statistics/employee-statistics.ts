import { Component, inject } from '@angular/core';
import { ShareDataService } from '../create-comp/share-data-service';

@Component({
  selector: 'app-employee-statistics',
  imports: [],
  templateUrl: './employee-statistics.html',
  styleUrl: './employee-statistics.css'
})
export class EmployeeStatistics {
  readonly data = inject(ShareDataService)
}
