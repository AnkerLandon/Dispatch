import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';
import { RouteService } from '../route/route.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer-dialog',
  templateUrl: './DC-Customer.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCCustomerComponent {

  confirmDelete = false;
  public routes;
  // private routeSub: Subscription;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCCustomerComponent>,
    public customerService: CustomerService,
    public router: Router,
    private routeService: RouteService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.routes = this.routeService.getRouteArray();
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveCustomer(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    formData.value.route = formData.value.route.toUpperCase();
    this.customerService.addCustomer(formData.value);
    this.dialogRef.close();
  }

  editCustomer(formData: NgForm) {
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
    formData.value.route = formData.value.route.toUpperCase();
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
