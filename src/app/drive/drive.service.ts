import { Injectable } from '@angular/core';
import { RouteService } from '../dispatch/route/route.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Invoice } from '../models/invoice-data.model';
import { Subject } from 'rxjs';
import { CustomerService } from '../dispatch/customers/customer.service';
import { Customer } from '../models/customers-data.model';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable ({providedIn: 'root'})
export class DriveService {

  private invoices: Invoice[] = [];
  private customers: Customer[] = [];
  private mergedData: any[] = [];
  private mapInvoice: Invoice;
  private invRouteUpdate = new Subject<any[]>();

  constructor(
    private routeService: RouteService,
    private customerService: CustomerService,
    private http: HttpClient
  ) {this.customerService.getCustomers(); }

  getRouteInvoices( route: string) {
    // this.currentInvoiceId = invoiceId;
    this.http.get
      <{documents}>
      (BACKEND_URL + '/invoice/route/' + route)
      .pipe(map((invoiceData) => {
        return invoiceData.documents.map(invoice => {
          this.mapInvoice = invoice;
          return this.mapInvoice;
        });
      }))
      .subscribe(transInvoices => {
        this.invoices = transInvoices;
        this.mergeData();
      });
  }

  private mergeData() {
    this.mergedData = [];
    for (let i = 0; i < this.invoices.length; i++) {
      const custData = this.customerService.searchCustomer(this.invoices[i].accountId);
      const comboData = {
        billId: this.invoices[i].billId,
        custId: custData._id,
        invoiceId: this.invoices[i]._id,
        date: this.invoices[i].date,
        requests: this.invoices[i].requests,
        route: this.invoices[i].route,
        name: custData.name,
        companyName: custData.companyName,
        address: custData.address,
        city: custData.city,
        township: custData.township
      };
      this.mergedData.push(comboData);
    }
    this.invRouteUpdate.next([...this.mergedData]);
  }

  completeRequests(data: any) {
    for ( let i = 0; i < data.requests.length; i++) {
      const record = {
        invoiceId: data.invoiceId,
        requestId: data.requests[i]._id,
        checked: data.requests[i].complete,
      };
      this.http.put(BACKEND_URL + '/invoice/driver/update/'
        + record.invoiceId, record)
        .subscribe((response: any) => {
          /*
          this.invoice.requests[this.requestIndex] = request;

          this.getInvoices(this.currentInvoiceId);
          */
      });
    }
    this.http.put(BACKEND_URL + '/payment/addPayment/'
      + data.billId, data.payment)
      .subscribe((response: any) => {

    });
  }

  getInvRouteUpdateListener() {
    return this.invRouteUpdate.asObservable();
  }

  getCustomer(myId: string) {
    const cust = this.customerService.searchCustomer(myId);
    if ( !this.customers.find(c => c._id === myId)) {
      this.customers.push(cust);
    }
  }



  getCustomers() {
    return this.customers;
  }

}
