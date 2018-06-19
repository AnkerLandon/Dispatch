import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Invoice } from '../../models/invoice-data.model';
import { Request } from '../../models/invoice-data.model';

@Injectable({providedIn: 'root'})
export class InvoiceService {
  private invoices: Invoice[] = [];

  private invoiceUpdate = new Subject<Invoice[]>();

  constructor(private http: HttpClient) {}


getInvoices(invoiceId: string) {
  this.http.get
    <{documents}>
    ('http://localhost:3000/api/invoice/' + invoiceId)
    .pipe(map((invoiceData) => {
      return invoiceData.documents.map(invoice => {
        return {
          id: invoice._id,
          accountId: invoice.accountId,
          date: invoice.date,
          requests: invoice.requests,
          total: invoice.total
        };
      });
    }))
    .subscribe(transInvoices => {
      this.invoices = transInvoices;
      this.invoiceUpdate.next([...this.invoices]);
    });
}

getInvoice(id: string) {
  return {...this.invoices.find(i => i.id === id)};
}

getInvoicesUpdateListener() {
  return this.invoiceUpdate.asObservable();
}

addInvoice(newRequest: Request) {
  this.http.post<{message: string, newInvoice: Invoice }>
    ('http://localhost:3000/api/invoice', newRequest)
    .subscribe((responceData) => {
      this.invoices.push(responceData.newInvoice);
      this.invoiceUpdate.next([...this.invoices]);
    });
}

deleteInvoice(invoiceId: string) {
  this.http.delete('http://localhost:3000/api/invoice/' + invoiceId )
    .subscribe(() => {
      const updatedInvoices = this.invoices.filter(invoice => invoice.id !== invoiceId);
      this.invoices = updatedInvoices;
      this.invoiceUpdate.next([...this.invoices]);
    });
}


}
