import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customers-data.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {  InvoiceService } from '../invoices/invoice.service';

@Injectable({providedIn: 'root'})
export class CustomerService {
  private customers: Customer[] = [];

  private dataUpdate = new Subject<any[]>();

  constructor(private http: HttpClient, public invoiceService: InvoiceService, ) {}

  getCustomers() {
    this.http.get
      <{documents}>
      ('http://localhost:3000/api/customers')
      .pipe(map((customerData) => {
        return customerData.documents.map(customer => {
          return {
            id: customer._id,
            name: customer.name,
            address: customer.address,
            city: customer.city,
            payment: customer.payment
          };
        });
      }))
      .subscribe(transCustomers => {
        this.customers = transCustomers;
        this.dataUpdate.next([...this.customers]);
      });
  }

  getCustomer(id: string): Customer {
    return {...this.customers.find(c => c.id === id)};
  }

  getDataUpdateListener() {
    return this.dataUpdate.asObservable();
  }

  addCustomer(newCustomer: Customer) {
    this.http.post<{message: string, custId: string}>
      ('http://localhost:3000/api/customers', newCustomer)
      .subscribe((responceData) => {
        const myCustId = responceData.custId;
        newCustomer.id = myCustId;
        this.customers.push(newCustomer);
        this.dataUpdate.next([...this.customers]);
      });
  }

  deleteCustomer(customerId: string) {
    this.http.delete('http://localhost:3000/api/customers/' + customerId )
      .subscribe((response) => {
        console.log(response);
        console.log(this.customers);
        this.getCustomers();
      });
  }

  editCustomer(id: string, editedCustomer: Customer) {
    this.http.put('http://localhost:3000/api/customers/' + id, editedCustomer)
    .subscribe((response) => {
      console.log(response);
      this.getCustomers();
    });
  }

}
