import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { RouteService } from '../route/route.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment-dialog',
  template: `
  <h1 mat-dialog-title> Customer </h1>
  <div mat-dialog-content>

    <form  #formData="ngForm">

      <mat-form-field class="item">
        <mat-select
          class="inputs"
          placeholder='Payment Type'
          name='paymentType'
          [ngModel]="data.paymentType"
          required
          >
            <mat-option value="Check">Check</mat-option>
            <mat-option value="Cash">Cash</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field class="item">
        <input matInput
          class="inputs"
          type='string'
          name='address'
          placeholder=Address
          [ngModel]="data.address"
          required
        >
      </mat-form-field>

      <div mat-dialog-actions id="buttons">
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button
          mat-button
          *ngIf="!data._id"
          type="submit"
          (click)="saveCustomer(formData)"
          cdkFocusInitial
          >Submit</button>
        <button
          mat-button
          *ngIf="data._id"
          type="submit"
          (click)="editCustomer(formData)"
          cdkFocusInitial
          >Edit</button>
        <button
          mat-button
          *ngIf="data._id && !confirmDelete"
          id="delete"
          color="warn"
          (click)="checkDelete()"
          >Delete
        </button>
        <button
          mat-button
          *ngIf="confirmDelete"
          id="delete"
          color="warn"
          (click)="deleteCustomer(formData)"
          >Delete cannot be undone
        </button>
      </div>
    </form>

  </div>

  `,
  styleUrls: ['../DC.component.css']
})
export class DCPaymentComponent {

  constructor(
    public dialogRef: MatDialogRef<DCPaymentComponent>,

    public router: Router,
    private routeService: RouteService,
    private paymentService: PaymentService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

    savePayment(formData: NgForm) {
      if (formData.invalid) {
        return;
      }
      console.log('new payment data', formData.value);
      this.paymentService.addPayment();
      this.dialogRef.close();
    }

}
