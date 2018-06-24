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
  private requestIndex;
  private invoiceUpdate = new Subject<Invoice[]>();
  private requestUpdate = new Subject<Invoice>();

  constructor(private http: HttpClient) {}

setRequestIndex(request: Request) {
  console.log(this.invoice.requests.indexOf(request));
  this.requestIndex = this.invoice.requests.indexOf(request);
}

getInvoices(invoiceId: string) {
  this.http.get
    <{documents}>
    ('http://localhost:3000/api/invoice/' + invoiceId)
    .pipe(map((invoiceData) => {
      return invoiceData.documents.map(invoice => {
        return {
          _id: invoice._id,
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
  return {...this.invoices.find(i => i._id === id)};
}

setRequest(newId: string) {
  const myInvoice = this.getInvoice(newId);
  this.invoice = myInvoice;
  this.requestUpdate.next(this.invoice);
}

getCurrentInvoice() {
  return this.invoice;
}

viewRequestUpdate() {
  return this.requestUpdate.asObservable();
}

editRecord( request: Request) {
  const accountId = this.getCurrentInvoice();
  console.log('edit service', request);
  this.http.put('http://localhost:3000/api/invoice/request/'
    + accountId._id, request)
    .subscribe((response: any) => {
      console.log(response.message);
      this.invoice.requests[this.requestIndex] = request;
      this.requestUpdate.next(this.invoice);
    });
}

getInvoicesUpdateListener() {
  return this.invoiceUpdate.asObservable();
}

addRequest(newRequest: any) {
  console.log('addRequest', newRequest);
  const currenInvoice = this.getCurrentInvoice();
  this.http.put('http://localhost:3000/api/invoice/' + currenInvoice._id, newRequest)
    .subscribe((response: any) => {
      console.log(response.message);
      this.invoice.requests.push(response.data);
      this.requestUpdate.next(this.invoice);
    });
}

addInvoice(newRequest: any) {
  console.log('service', newRequest);
  this.http.post<{message: string, newInvoice: any }>
    ('http://localhost:3000/api/invoice', newRequest)
    .subscribe((responceData) => {
      this.invoices.push(responceData.newInvoice);
      this.invoiceUpdate.next([...this.invoices]);
    });
}

deleteInvoices(accountId: string) {
  this.http.delete('http://localhost:3000/api/invoice/destroy/' + accountId )
    .subscribe((result) => {
      console.log(result); /*
       const updatedInvoices = this.invoices.filter(invoices => invoices.accountId !== accountId);
       this.invoices = updatedInvoices;
       this.invoiceUpdate.next([...this.invoices]);*/
    });
}


}
