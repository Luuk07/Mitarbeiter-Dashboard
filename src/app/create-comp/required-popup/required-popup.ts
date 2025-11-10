import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { share } from 'rxjs';
import { ShareDataService } from '../share-data-service';

// Popup to show required fields
@Component({
  selector: 'app-required-popup',
  imports: [MatDialogModule],
  templateUrl: './required-popup.html',
  styleUrl: './required-popup.css'
})
export class RequiredPopup {
  data = inject(ShareDataService);
}
