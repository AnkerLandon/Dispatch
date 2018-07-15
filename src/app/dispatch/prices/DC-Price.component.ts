import { Component, Inject, EventEmitter, Output, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { PriceService } from './price.service';
import { InvoiceService } from '../invoices/invoice.service';
import { Price, Fee } from '../../models/price-data.model';


@Component({
  selector: 'app-dialog-add',
  templateUrl: './DC-Price.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCPriceComponent {
  confirmDelete = false;
  public animalArray = [];
  public feeItems = [];
  public feeNum = 0;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCPriceComponent>,
    public priceService: PriceService,
    private invoiceService: InvoiceService,
    public router: Router,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      this.animalArray = this.invoiceService.getAnimals();
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  savePrice(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    console.log('price form data', formData.value, this.feeItems);
    const price: Price = {
      pickup: formData.value.pickup,
      subscription: formData.value.subscription,
      tax: formData.value.tax,
      fees: []
    };
    for (let i = 0; i < this.feeNum; i++) {
      const fee: Fee = {
        animal: formData.value['animal' + i],
        feeAmount: formData.value['feeAmount' + i],
        taxable: formData.value['taxable' + i],
        appliesToo: formData.value['appliesToo' + i]
      };
      price.fees.push(fee);
    }
    console.log(price);
    this.priceService.newPrice(price);
    this.dialogRef.close();
  }

  editPrice(formData: NgForm) {
    console.log(this.data._id, formData.value);
    if (formData.invalid) {
      return;
    }

    // this.customerService.editCustomer(this.data._id, formData.value);
    this.dialogRef.close();
  }

  deletePrice() {
    // this.customerService.deleteCustomer(this.data._id);
    this.router.navigate(['/customers']);
    this.dialogRef.close();
  }

  checkDelete() {
    this.confirmDelete = true;
  }

  incFee() {
    this.feeItems.push(this.feeNum) ;
    this.feeNum++;
    console.log('incFee', this.feeItems);
  }

}
