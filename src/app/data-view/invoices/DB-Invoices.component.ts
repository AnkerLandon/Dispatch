import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import { InvoiceService } from './invoice.service';
import { DCInvoiceComponent } from './DC-Invoice.component';



@Component({
  selector: 'app-db-invoice',
  template: `
    <button mat-mini-fab >
    <mat-icon
      aria-label="icon-button with an add icon"
      (click)=openInvoiceDialog(myForm) >add</mat-icon>
    </button>
    `,
  styleUrls: ['../dialog-box.component.css']
})
export class DBInvoiceComponent {
  constructor(
    public dialog: MatDialog,
    public invoiceService: InvoiceService
  ) {}

  @Input() myForm: any;

  openInvoiceDialog(dialogRequest: any): void {
  const dialogRef = this.dialog.open(DCInvoiceComponent, {
    maxWidth: '50vw',
    data:  this.myForm});

    dialogRef.componentInstance.newRecord.subscribe((newData: any) => {
    newData.accountId = dialogRequest.accountId;

    if (!newData.other) {newData.other = ''; }

    this.invoiceService.addInvoice(newData);
  });
  }
}







