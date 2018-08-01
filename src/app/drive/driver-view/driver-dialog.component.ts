import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { DriveService } from '../drive.service';

@Component({
  selector: 'app-driver-dialog-view',
  template: `
  <mat-checkbox
      mat-dialog-title
      [(ngModel)]=paymentReceived
      (change)="onChange()"
      >Payment Received?
    </mat-checkbox>

  <div class='form'>

  <form  #formData="ngForm">
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

    <mat-form-field class="item" *ngIf="paymentType === 'check'">
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
  styleUrls: ['../drive.component.css']
})
export class DCDriverComponent {

  public paymentReceived = false;
  public paymentType = '';
  public paymentAmount = 0;
  public paymentNumber = null;

  constructor(
    public dialogRef: MatDialogRef<DCDriverComponent>,
    private driverService: DriveService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      console.log(data);
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    onChange() {
      console.log(this.paymentReceived);
    }
    submit(formData) {
      if (!this.paymentReceived) {this.paymentReceived = false; }
      const payment = {
        received: this.paymentReceived,
        type: this.paymentType,
        amount: this.paymentAmount,
        number: this.paymentNumber
      };
      this.data.payment = payment;
      console.log('submit data:', this.data, formData.value);
      this.driverService.completeRequests(this.data);
      this.dialogRef.close();
    }
}

