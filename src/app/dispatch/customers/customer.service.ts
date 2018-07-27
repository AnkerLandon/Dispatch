import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customers-data.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { InvoiceService } from '../invoices/invoice.service';
import { MatDialog } from '@angular/material';
import { NotificationService } from '../../nav/notification/snack.service';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private customers: Customer[] = [];
  private customer: Customer;
  private mapCustomer: Customer;

  private dataUpdate = new Subject<any[]>();
  private currentCustomerUpdate = new Subject<Customer>();

  constructor(
    private http: HttpClient,
    public invoiceService: InvoiceService,
    public dialog: MatDialog
  ) { }

  getCustomers() {
    this.http.get
      <{documents}>
      ('http://localhost:3000/api/customers')
      .pipe(map((customerData) => {
        return customerData.documents.map(customer => {
          this.mapCustomer = customer;
          return this.mapCustomer;
        });
      }))
      .subscribe(transCustomers => {
        this.customers = transCustomers;
        console.log('Customer Get');
        this.dataUpdate.next([...this.customers]);
      });
  }

  getCustomer(custId: string) {
    this.http.get <Customer> ('http://localhost:3000/api/customers/' + custId)
    .subscribe(myCustomer => {
      this.customer = myCustomer;
      this.currentCustomerUpdate.next(this.customer);
      console.log('customer: ', this.customer);
    });
  }

  setCurrentCustomer(_id: string) {
    this.customer = this.customers.find(c => c._id === _id);
    this.currentCustomerUpdate.next(this.customer);
  }

  searchCustomer(_id: string) {
    return this.customers.find(c => c._id === _id);
  }

  getCurrentCustomer() {
    return this.customer;
  }

  getCustomerRoute() {
    return this.customer.route;
  }

  isCurrentCustomerCash() {
    console.log('current customer paymentPlan:', this.customer.currentPlan);
    if (this.customer.currentPlan === 'Cash') { return true; }
    return false;
  }

  getCurrentCustomerUpdateListener() {
    return this.currentCustomerUpdate.asObservable();
  }

  getDataUpdateListener() {
    return this.dataUpdate.asObservable();
  }

  addCustomer(newCustomer: Customer) {
    console.log('service cust data', newCustomer);
    this.http.post
      ('http://localhost:3000/api/customers/new', newCustomer)
      .subscribe((responceData: any) => {
        const myCust_id = responceData.custId ;
        newCustomer._id = myCust_id;
        newCustomer.planLog = [{plan: newCustomer.currentPlan, start: new Date}];
        this.customers.push(newCustomer);
        this.dataUpdate.next([...this.customers]);
      });
  }

  deleteCustomer(customer_id: string) {
    this.invoiceService.deleteInvoices(customer_id);
    this.http.delete('http://localhost:3000/api/customers/' + customer_id)
      .subscribe((response: any) => {
      this.getCustomers();
      });
  }

  editCustomer(editedCustomer: Customer) {
    this.http.put('http://localhost:3000/api/customers/details/' + editedCustomer._id, editedCustomer)
    .subscribe((response: any) => {
      console.log(response);
      this.getCustomers();
      this.customer = editedCustomer;
      this.currentCustomerUpdate.next(this.customer);
    });
  }

  addCustomerPaymentPlan( newPlan: any) {
  this.http.put('http://localhost:3000/api/customers/addpaymentplan/' + newPlan.id, newPlan)
    .subscribe((response: any) => {
      console.log(response);
    });
    this.http.put('http://localhost:3000/api/customers/addend/' + newPlan.id, null)
    .subscribe((response: any) => {
      console.log(response);
    });
  }



}
