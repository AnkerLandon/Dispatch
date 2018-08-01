import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../route/route.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';
import { PaymentService } from './payment.service';
import { Payment } from '../../models/payment-data.model';

@Component({
  selector: 'app-payment-dialog',
  template: `

  <mat-checkbox
    *ngIf="customerId"
    [(ngModel)]=newBill
    >Add new bill?
  </mat-checkbox>

  <mat-checkbox
    *ngIf="!customerId || newBill"
    [(ngModel)]=paymentReceived
    >Payment Received?
  </mat-checkbox>

  <div class='form'>

  <form  #formData="ngForm">
    <mat-form-field class="item" *ngIf="newBill">
      <mat-select
        class="inputs"
        name='type'
        placeholder='Payment Type'
        [(ngModel)]=billType
        required
        >
        <mat-option value="invoice">Invoice</mat-option>
        <mat-option value="subscription">Subscription</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field class="item" *ngIf="newBill">
      <div class="item" >
        <input
          matInput
          class="inputs"
          type='number'
          name='billAmount'
          placeholder='Total'
          [(ngModel)]=billAmount
        >
      </div>
    </mat-form-field>

  <form  #formData="ngForm" >
    <mat-form-field class="item" *ngIf="paymentReceived">
      <mat-select
        class="inputs"
        name='type'
        placeholder='Payment Type'
        [(ngModel)]=paymentType
        required
        >
        <mat-option value="cash">Cash</mat-option>
        <mat-option value="check">Check</mat-option>
      </mat-select>
    </mat-form-field>

    <mat-form-field class="item" *ngIf="paymentReceived">
      <div class="item" >
        <input
          matInput
          class="inputs"
          type='number'
          name='amount'
          placeholder='Amount'
          [(ngModel)]=paymentAmount
        >
      </div>
    </mat-form-field>

    <mat-form-field class="item" *ngIf="paymentType == 'check'">
      <div class="item" >
        <input
          matInput
          class="inputs"
          type='number'
          name='number'
          placeholder='Check Number'
          [(ngModel)]=paymentNumber
        >
      </div>
    </mat-form-field>

      <div mat-dialog-actions id="buttons">
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button
          mat-button
          type="submit"
          (click)=submit(formData)
          cdkFocusInitial
          >Submit</button>
      </div>

  </form>

  `,
  styleUrls: ['../DC.component.css']
})
export class DCPaymentComponent {

  public paymentReceived = false;
  public paymentType = '';
  public paymentAmount = null;
  public paymentNumber = null;

  public customerId: string;
  public newBill = false;
  public billType = '';
  public billAmount = 0;

  constructor(
    public dialogRef: MatDialogRef<DCPaymentComponent>,
    public route: ActivatedRoute,
    public router: Router,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      if (data.customerId) {
        this.customerId = data.customerId;
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    submit(formData) {
      // if (!this.paymentReceived) {this.paymentReceived = false; }

      if (this.paymentReceived && this.newBill || this.newBill) {
        const bill: Payment = {
          accountId: this.customerId,
          invoiceId: null,
          billType: this.billType,
          amountDue: this.billAmount,
          paymentType: this.paymentType,
          paymentAmount: this.paymentAmount,
          checkNumber: this.paymentNumber
        };
        this.paymentService.newBill(bill);
      } else if (this.paymentReceived) {
        const payment = {
          received: this.paymentReceived,
          type: this.paymentType,
          amount: this.paymentAmount,
          number: this.paymentNumber
        };

        this.data.payment = payment;
        this.paymentService.addPayment(this.data);

      }
      this.dialogRef.close();
    }

}
