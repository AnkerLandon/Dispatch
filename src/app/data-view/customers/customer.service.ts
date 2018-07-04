import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customers-data.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {  InvoiceService } from '../invoices/invoice.service';
import { DCCustomerComponent } from './DC-Customer.component';
import { MatDialog } from '@angular/material';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private customers: Customer[] = [];
  private customer: Customer;

  private dataUpdate = new Subject<any[]>();
  private currentCustomerUpdate = new Subject<Customer>();

  constructor(
    private http: HttpClient,
    public invoiceService: InvoiceService,
    public dialog: MatDialog
  ) {}

  getCustomers() {
    this.http.get
      <{documents}>
      ('http://localhost:3000/api/customers')
      .pipe(map((customerData) => {
        return customerData.documents.map(customer => {
          return {
            _id: customer._id,
            companyName: customer.companyName,
            name: customer.name,
            address: customer.address,
            city: customer.city,
            township: customer.township,
            currentPlan: customer.currentPlan,
            planLog: customer.planLog
          };
        });
      }))
      .subscribe(transCustomers => {
        this.customers = transCustomers;
        console.log('Customer Get');
        this.dataUpdate.next([...this.customers]);
      });
  }

  getCustomer(_id: string) {
    return this.customers.find(c => c._id === _id);
  }

  setCurrentCustomer(_id: string) {
    this.customer = this.customers.find(c => c._id === _id);
    this.currentCustomerUpdate.next(this.customer);
  }

  getCurrentCustomer() {
    return this.customer;
  }

  test() {
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
      .subscribe((response) => {
      this.getCustomers();
      });
  }

  editCustomer(editedCustomer: Customer) {
    this.http.put('http://localhost:3000/api/customers/details/' + editedCustomer._id, editedCustomer)
    .subscribe((response) => {
      console.log(response);
      this.getCustomers();
      this.customer = editedCustomer;
      this.currentCustomerUpdate.next(this.customer);
    });
  }

  addCustomerPaymentPlan( newPlan: any) {
  this.http.put('http://localhost:3000/api/customers/addpaymentplan/' + newPlan.id, newPlan)
    .subscribe((response) => {
      console.log(response);
      /*
      this.getCustomers();
      this.customer = editedCustomer;
      this.currentCustomerUpdate.next(this.customer);*/
    });
    this.http.put('http://localhost:3000/api/customers/addend/' + newPlan.id, null)
    .subscribe((response) => {
      console.log(response);
      /*
      this.getCustomers();
      this.customer = editedCustomer;
      this.currentCustomerUpdate.next(this.customer);*/
    });
  }

}
