import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Customer } from '../../models/customers-data.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { InvoiceService } from '../invoices/invoice.service';
import { MatDialog } from '@angular/material';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/customers';

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
      (BACKEND_URL)
      .pipe(map((customerData) => {
        return customerData.documents.map(customer => {
          this.mapCustomer = customer;
          return this.mapCustomer;
        });
      }))
      .subscribe(transCustomers => {
        this.customers = transCustomers;
        this.dataUpdate.next([...this.customers]);
      });
  }

  getDataUpdateListener() {
    return this.dataUpdate.asObservable();
  }

  getCustomer(custId: string) {
    this.http.get <Customer> (BACKEND_URL + '/' + custId)
    .subscribe(myCustomer => {
      this.customer = myCustomer;
      this.currentCustomerUpdate.next(this.customer);
    });
  }

  getCurrentCustomerUpdateListener() {
    return this.currentCustomerUpdate.asObservable();
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
    if (this.customer.currentPlan === 'Cash') { return true; }
    return false;
  }

  addCustomer(newCustomer: Customer) {
    this.http.post
      (BACKEND_URL + '/new', newCustomer)
      .subscribe((responceData: any) => {
        const myCust_id = responceData.custId ;
        newCustomer._id = myCust_id;
        newCustomer.planLog = [{plan: newCustomer.currentPlan, start: new Date}];
        this.customers.push(newCustomer);
        this.dataUpdate.next([...this.customers]);
      });
  }

  editCustomer(editedCustomer: Customer) {
    this.http.put(BACKEND_URL + '/details/' + editedCustomer._id, editedCustomer)
    .subscribe((response: any) => {
      this.getCustomers();
      this.customer = editedCustomer;
      this.currentCustomerUpdate.next(this.customer);
    });
  }

  addCustomerPaymentPlan( newPlan: any) {
  this.http.put(BACKEND_URL + '/addpaymentplan/' + newPlan.id, newPlan)
    .subscribe((response: any) => {
    });
    this.http.put(BACKEND_URL + '/addend/' + newPlan.id, null)
    .subscribe((response: any) => {
    });
  }

  deleteCustomer(customer_id: string) {
    this.invoiceService.deleteInvoices(customer_id);
    this.http.delete(BACKEND_URL + '/' + customer_id)
      .subscribe((response: any) => {
      this.getCustomers();
      });
  }



}
