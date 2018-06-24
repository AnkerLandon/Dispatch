import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import { InvoiceService } from '../data-view/invoices/invoice.service';
import { DCInvoiceComponent } from '../data-view/invoices/DC-Invoice.component';
import { Request } from '../models/invoice-data.model';



@Component({
  selector: 'app-db-request',
  template: `
      <mat-icon
        aria-label="icon-button with an add icon"
        (click)="openRequestDialog()" >edit </mat-icon>
    `,
  styles: [`
  `]
})
export class DBRequestComponent {
  constructor(
    public dialog: MatDialog,
    public invoiceService: InvoiceService
  ) {}

  @Input() myForm: any;

  openRequestDialog() {
    console.log('edit', this.myForm);
    const dialogRef = this.dialog.open(DCInvoiceComponent, {
      maxWidth: '50vw',
      data:  this.myForm});
  }
}







