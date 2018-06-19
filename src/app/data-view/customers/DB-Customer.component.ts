import {Component, Input} from '@angular/core';
import {MatDialog} from '@angular/material';
import { CustomerService } from './customer.service';
import { DCCustomerComponent } from './DC-Customer.component';


@Component({
  selector: 'app-db-customer',
  template: `
    <button mat-mini-fab >
    <mat-icon
      aria-label="icon-button with an add icon"
      (click)=openCustomerDialog(myForm) >add</mat-icon>
    </button>
    `,
  styleUrls: ['../dialog-box.component.css']
})
export class DBCustomerComponent  {
  constructor(
    public dialog: MatDialog,
    public customerService: CustomerService
  ) {}


  @Input() myForm: any;

  openCustomerDialog(dialogRequest: any): void {
    const dialogRef = this.dialog.open(DCCustomerComponent, {
      maxWidth: '50vw',
      data:  this.myForm});

      dialogRef.componentInstance.newRecord.subscribe((newData: any) => {
      this.customerService.addCustomer(newData);
    });
  }
}



