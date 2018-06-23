import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Invoice } from '../../models/invoice-data.model';
import { Request } from '../../models/invoice-data.model';


@Injectable({providedIn: 'root'})
export class InvoiceService {
  private invoices: Invoice[] = [];
  private invoice: Invoice;
  private invoiceUpdate = new Subject<Invoice[]>();
  private requestUpdate = new Subject<Invoice>();

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

setRequest(newId: string) {
  const myInvoice = this.getInvoice(newId);
  this.invoice = myInvoice;
  this.requestUpdate.next(this.invoice);
  console.log(this.invoice);
}

getCurrentInvoice() {
  return this.invoice;
}

viewRequestUpdate() {
  return this.requestUpdate.asObservable();
}



getInvoicesUpdateListener() {
  return this.invoiceUpdate.asObservable();
}

addRequest(newRequest: any) {
  console.log(newRequest);
  this.http.put('http://localhost:3000/api/invoice/' + newRequest.id, newRequest)
    .subscribe((response) => {
      console.log(response);

    });
}

addInvoice(newRequest: Request) {
  this.http.post<{message: string, newInvoice: Invoice }>
    ('http://localhost:3000/api/invoice', newRequest)
    .subscribe((responceData) => {
      this.invoices.push(responceData.newInvoice);
      this.invoiceUpdate.next([...this.invoices]);
    });
}

deleteInvoices(accountId: string) {
  this.http.delete('http://localhost:3000/api/invoice/' + accountId )
    .subscribe(() => {
       const updatedInvoices = this.invoices.filter(invoices => invoices.accountId !== accountId);
       this.invoices = updatedInvoices;
       this.invoiceUpdate.next([...this.invoices]);
    });
}


}
