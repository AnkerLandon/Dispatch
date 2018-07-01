import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { PriceService } from './price.service';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './DC-Price.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCPriceComponent {

  confirmDelete = false;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCPriceComponent>,
    public priceService: PriceService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  savePrice(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    console.log(formData.value);
    this.priceService.newPrice(formData.value);
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

}
