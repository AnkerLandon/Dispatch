import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import { InvoiceService } from '../data-view/invoices/invoice.service';
import { DCInvoiceComponent } from '../data-view/invoices/DC-Invoice.component';
import { Invoice } from '../models/invoice-data.model';



@Component({
  selector: 'app-db-request',
  template: `
    <button mat-mini-fab >
      <mat-icon
        aria-label="icon-button with an add icon"
        (click)="openRequestDialog()" >add </mat-icon>
    </button>
    `,
  styles: [`
  `]
})
export class DBRequestComponent {
  constructor(
    public dialog: MatDialog,
    public invoiceService: InvoiceService
  ) {}


  openRequestDialog() {
    const myForm = this.invoiceService.getCurrentInvoice();
    console.log(myForm);
    const dialogRef = this.dialog.open(DCInvoiceComponent, {
    maxWidth: '50vw',
    data:  myForm.requests});

    dialogRef.componentInstance.newRecord.subscribe((newData: any) => {
    newData.id = myForm.id;

    if (!newData.other) {newData.other = ''; }
    console.log(newData);

    this.invoiceService.addRequest(newData);
  });
  }
}







