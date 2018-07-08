import {Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';

import { NgForm } from '@angular/forms';
import { InvoiceService } from './invoice.service';
import { PriceService } from '../prices/price.service';
import { Price } from '../../models/price-data.model';
import { CustomerService } from '../customers/customer.service';


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
    'horse',
    'barrel',
    'other'];


  myRequest: any;
  confirmDelete = false;
  complete = false;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCInvoiceComponent>,
    public invoiceService: InvoiceService,
    public priceService: PriceService,
    private customerService: CustomerService,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

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
    if ( this.customerService.isCurrentCustomerCash()) {
      formData.value.pickupFee = this.priceService.getPickupPrice();
      formData.value.tax = this.priceService.getTax(formData.value.pickupFee) * 1;
    } else {
      formData.value.pickupFee = 0;
      formData.value.pickupFee = 0;
    }
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

  completeSwitch(value: boolean) {
    if (value) {this.complete = false; } else {this.complete = true; }
  }

  private prepFormData(formData: NgForm) {
    const price = this.priceService.getMostRecentPrice();

    if (!formData.value.other) {formData.value.other = ''; }

    if (formData.value.animal === 'cow' || formData.value.animal === 'horse') {
      formData.value.price = price[formData.value.animal] * formData.value.number;
    } else {formData.value.price = 0; }

    if (formData.value.animal === 'horse') {
      formData.value.tax += this.priceService.getTax(price['horse'] * formData.value.number);
    }

    formData.value.priceId = price._id;
    formData.value.route = this.customerService.getCustomerRoute();
    formData.value.accountId = this.data.accountId;

    console.log('formData', formData.value);
    return formData.value;
  }


}
