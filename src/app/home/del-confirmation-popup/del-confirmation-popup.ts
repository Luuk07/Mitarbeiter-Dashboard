import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

// Popup for Delete Confirmation
@Component({
  selector: 'app-del-confirmation-popup',
  imports: [MatButtonModule, MatDialogModule],
  templateUrl: './del-confirmation-popup.html',
  styleUrl: './del-confirmation-popup.css'
})
export class DelConfirmationPopup {

}
