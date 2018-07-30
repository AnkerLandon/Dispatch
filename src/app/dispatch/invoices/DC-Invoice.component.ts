import {Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { NgForm } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { PriceService } from '../prices/price.service';


@Component({
  selector: 'app-dialog-add',
  templateUrl: './DC-Invoice.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCInvoiceComponent {

  public animals: string[] = [];
  // private myRequest: any;
  public confirmDelete = false;
  public complete = false;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCInvoiceComponent>,
    public invoiceService: InvoiceService,
    public priceService: PriceService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.animals = this.invoiceService.getAnimals();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addRequest(formData: NgForm) {
    if (formData.invalid) { return; }
    this.invoiceService.addRequest(this.prepFormData(formData));
    this.dialogRef.close();
  }

  addInvoice(formData: NgForm) {
    if (formData.invalid) { return; }

    this.invoiceService.addInvoice(this.prepFormData(formData));
    this.dialogRef.close();
  }

  editRequest(formData: NgForm) {
    if (formData.invalid) { return; }
    formData.value._id = this.data._id;
    this.invoiceService.setRequestIndex(this.data);
    this.invoiceService.editRecord(this.prepFormData(formData));
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
/*
  completeSwitch(value: boolean) {
    // if (value) {this.complete = false; } else {this.complete = true; }
  }
*/
  private prepFormData(formData: NgForm) {

    if (!formData.value.other) {formData.value.other = ''; }

    formData.value.accountId = this.data.accountId;
    formData.value.complete = this.complete;

    return formData.value;
  }


}
