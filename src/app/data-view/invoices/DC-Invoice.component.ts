import {Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';

import { NgForm } from '@angular/forms';
import { InvoiceService } from './invoice.service';


@Component({
  selector: 'app-dialog-add',
  templateUrl: './DC-Invoice.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCInvoiceComponent {
  animals: string[] = [
    'cow',
    'heffer',
    'calf',
    'bull',
    'steer',
    'pig',
    'sow',
    'boar',
    'barrel',
    'other'];


  myRequest: any;
  confirmDelete = false;
  complete = false;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCInvoiceComponent>,
    public invoiceService: InvoiceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  addRequest(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    if (!formData.value.other) {formData.value.other = ''; }
    formData.value.accountId = this.data.accountId;
    this.invoiceService.addRequest(formData.value);
    this.dialogRef.close();
  }

  addInvoice(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    if (!formData.value.other) {formData.value.other = ''; }
    formData.value.accountId = this.data.accountId;
    this.invoiceService.addInvoice(formData.value);
    this.dialogRef.close();
  }

  editRequest(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.invoiceService.setRequestIndex(this.data);
    this.myRequest = {
      _id: this.data._id,
      number: formData.value.number,
      animal: formData.value.animal,
      other: formData.value.other,
      complete: this.complete,
      price: 0
    };
    if (!this.myRequest.other) {this.myRequest.other = ''; }
    console.log('DC', this.myRequest, this.data);
    this.invoiceService.editRecord(this.myRequest);
    this.dialogRef.close();
  }

  deleteRequest() {
    this.invoiceService.setRequestIndex(this.data);
    this.invoiceService.deleteRequest(this.data._id);
    this.dialogRef.close();
  }

  checkDelete() {
    this.confirmDelete = true;
  }

  completeSwitch(value: boolean) {
    if (value) {this.complete = false; } else {this.complete = true; }
  }



}
