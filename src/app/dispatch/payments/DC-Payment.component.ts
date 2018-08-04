import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from '../route/route.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';
import { PaymentService } from './payment.service';
import { Bill, Payment } from '../../models/payment-data.model';

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

  <div mat-dialog-content class='form'>

  <form  #formData="ngForm">
    <mat-form-field class="item" *ngIf="newBill">
      <mat-select
        class="inputs"
        name='type'
        placeholder='Bill Type'
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
          [(ngModel)]=checkNumber
        >
      </div>
    </mat-form-field>

    <div *ngIf="totals.due">
      <p class="pain"> Total: {{totals.due}} </p>
      <p class="pain"> Remaining: {{totals.due - totals.paid}} </p>
    </div>

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
  public checkNumber = null;

  public customerId = '';
  public totals = {due: null, paid: null};

  public newBill = false;
  public billType = '';
  public billAmount = null;

  constructor(
    public dialogRef: MatDialogRef<DCPaymentComponent>,
    public route: ActivatedRoute,
    public router: Router,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

      switch (data.type) {
        case 'new':
          this.customerId = data.customerId;
        break;
        case 'add':
        this.totals = this.paymentService.getTotals();
        break;
        case 'edit':
          this.totals = this.paymentService.getTotals();
          this.paymentType = data.paymentType;
          this.paymentAmount = data.paymentAmount;
          this.checkNumber = data.checkNumber;
          this.paymentReceived = true;
        break;
        default:
        console.log('Payment Dialog Error');
      }

    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    submit(formData) {

      if (this.data.type === 'edit') {

        const payment: Payment = {
          paymentType: this.paymentType,
          paymentAmount: this.paymentAmount,
          checkNumber: this.checkNumber
        };
        this.paymentService.editPayment(this.data.billId, this.data._id, payment);
        this.dialogRef.close();
      } else if (this.paymentReceived && this.newBill || this.newBill) {
        const bill: Bill = {
          accountId: this.customerId,
          invoiceId: null,
          billType: this.billType,
          amountDue: this.billAmount,
          payments: []
        };
        if (this.paymentAmount) {
          const payment: Payment = {
            paymentType: this.paymentType,
            paymentAmount: this.paymentAmount,
            checkNumber: this.checkNumber
          };
          bill.payments.push(payment);
        }

        this.paymentService.newBill(bill);
      } else if (this.paymentReceived) {
        const payment: Payment = {
          paymentType: this.paymentType,
          paymentAmount: this.paymentAmount,
          checkNumber: this.checkNumber
        };

        this.data.payment = payment;
        this.paymentService.addPayment(this.data);

      }
      this.dialogRef.close();
    }

}
