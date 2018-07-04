import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './DC-Customer.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCCustomerComponent {

  confirmDelete = false;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCCustomerComponent>,
    public customerService: CustomerService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveCustomer(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    console.log('new cust data', formData.value);
    this.customerService.addCustomer(formData.value);
    this.dialogRef.close();
  }

  editCustomer(formData: NgForm) {
    console.log(this.data._id, formData.value);
    if (formData.invalid) {
      return;
    }

    formData.value._id = this.data._id;
    formData.value.planLog = this.data.planLog;

    if (this.data.currentPlan !== formData.value.currentPlan) {
      const data = {
        currentPlan: formData.value.currentPlan,
        oldpos: this.data.planLog.length - 1,
        id: formData.value._id
      };
      this.customerService.addCustomerPaymentPlan(data);
    }

    this.customerService.editCustomer(formData.value);
    this.dialogRef.close();
  }

  deleteCustomer() {
    this.customerService.deleteCustomer(this.data._id);
    this.router.navigate(['/customers']);
    this.dialogRef.close();
  }

  checkDelete() {
    this.confirmDelete = true;
  }

}
