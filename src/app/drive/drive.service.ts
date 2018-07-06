import { Injectable } from '@angular/core';
import { RouteService } from '../dispatch/route/route.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Invoice } from '../models/invoice-data.model';
import { Subject } from 'rxjs';
import { CustomerService } from '../dispatch/customers/customer.service';
import { Customer } from '../models/customers-data.model';

@Injectable ({providedIn: 'root'})
export class DriveService {

  private invoices: Invoice[] = [];
  private customers: Customer[] = [];
  private mergedData: any[] = [];
  private invRouteUpdate = new Subject<any[]>();

  constructor(
    private routeService: RouteService,
    private customerService: CustomerService,
    private http: HttpClient
  ) {}

  getRouteInvoices( route: string) {
    // this.currentInvoiceId = invoiceId;
    this.http.get
      <{documents}>
      ('http://localhost:3000/api/invoice/route/' + route)
      .pipe(map((invoiceData) => {
        return invoiceData.documents.map(invoice => {
          return {
            _id: invoice._id,
            accountId: invoice.accountId,
            date: invoice.date,
            requests: invoice.requests,
            total: invoice.total,
            route: invoice.route
          };
        });
      }))
      .subscribe(transInvoices => {
        this.invoices = transInvoices;
        console.log('getty', transInvoices);
        this.mergeData();
      });
  }

  mergeData() {
    this.mergedData = [];
    for (let i = 0; i < this.invoices.length; i++) {
      const custData = this.customerService.getCustomer(this.invoices[i].accountId);
      const comboData = {
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

  getInvRouteUpdateListener() {
    return this.invRouteUpdate.asObservable();
  }

  getCustomer(myId: string) {
    const cust = this.customerService.getCustomer(myId);
    if ( !this.customers.find(c => c._id === myId)) {
      this.customers.push(cust);
    }
  }

  getCustomers() {
    return this.customers;
  }

}
