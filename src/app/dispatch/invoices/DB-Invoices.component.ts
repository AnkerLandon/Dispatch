import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import { InvoiceService } from './invoice.service';
import { DCInvoiceComponent } from './DC-Invoice.component';



@Component({
  selector: 'app-db-invoice',
  template: `
    <mat-icon
      aria-label="icon-button with an add icon"
      (click)='openInvoiceDialog()' >add</mat-icon>
    `,
  styleUrls: ['../dialog-box.component.css']
})
export class DBInvoiceComponent {
  constructor(
    public dialog: MatDialog,
    public invoiceService: InvoiceService
  ) {}

  @Input() myForm: any;

  openInvoiceDialog(): void {
    console.log('start data', this.myForm);
    const dialogRef = this.dialog.open(DCInvoiceComponent, {
      maxWidth: '50vw',
      data:  this.myForm,
      disableClose: true
    });
  }
}







