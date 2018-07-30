import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgForm, FormBuilder } from '@angular/forms';
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

  public confirmDelete = false;
  public animalArray = [];
  public feeItems = [];
  public feeNum = 0;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCPriceComponent>,
    public priceService: PriceService,
    private invoiceService: InvoiceService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.animalArray = this.invoiceService.getAnimals();
    }


  onNoClick(): void {
    this.dialogRef.close();
  }

  savePrice(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
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
    this.priceService.newPrice(price);
    this.dialogRef.close();
  }

  incFee() {
    this.feeItems.push(this.feeNum) ;
    this.feeNum++;
  }

}
