import { Component } from '@angular/core';

@Component({
  selector: 'app-driver-view-',
  templateUrl: './driver-view.component.html',
  styleUrls: ['../drive.component.css']
})
export class DriverViewComponent {
  public invoices = ['invoice 1', 'invoice 2'];
}
