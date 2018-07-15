import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Invoice } from '../../models/invoice-data.model';
import { Request } from '../../models/invoice-data.model';


@Injectable({providedIn: 'root'})
export class InvoiceService {
  private mapInvoice: Invoice;
  private currentInvoiceId: string;
  private invoices: Invoice[] = [];
  private invoice: Invoice;
  private requestIndex;
  private invoiceUpdate = new Subject<Invoice[]>();
  private requestUpdate = new Subject<Request[]>();

  constructor(private http: HttpClient) {}

setRequestIndex(request: Request) {
  console.log(this.invoice.requests.indexOf(request));
  this.requestIndex = this.invoice.requests.indexOf(request);
}

getInvoices(invoiceId: string) {
  this.currentInvoiceId = invoiceId;
  this.http.get
    <{documents}>
    ('http://localhost:3000/api/invoice/' + invoiceId)
    .pipe(map((invoiceData) => {
      console.log('invocen Data', invoiceData);
      return invoiceData.documents.map(invoice => {
        this.mapInvoice = invoice;
        return this.mapInvoice;
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

setInvoice(newId: string) {
  const myInvoice = this.getInvoice(newId);
  this.invoice = myInvoice;
  this.requestUpdate.next(this.invoice.requests);
}

getCurrentInvoice() {
  return this.invoice;
}

editRecord( request: Request) {
  const currentInvoice = this.getCurrentInvoice();
  console.log('edit service', request);
  this.http.put('http://localhost:3000/api/invoice/request/'
    + currentInvoice._id, request)
    .subscribe((response: any) => {
      console.log(response.message);
      this.invoice.requests[this.requestIndex] = request;

      this.getInvoices(this.currentInvoiceId);
    });
}

getInvoicesUpdateListener() {
  return this.invoiceUpdate.asObservable();
}

getRequestUpdateListener() {
  return this.requestUpdate.asObservable();
}

addRequest(newRequest: any) {
  console.log('addRequest', newRequest);
  const currenInvoice = this.getCurrentInvoice();
  this.http.put('http://localhost:3000/api/invoice/' + currenInvoice._id, newRequest)
    .subscribe((response: any) => {
      console.log(response);
      this.invoice.requests.push(response.request);
      this.requestUpdate.next([...this.invoice.requests]);
    });
}

addInvoice(newRequest: any) {
  console.log('service', newRequest);
  this.http.post<{message: string, newInvoice: any }>
    ('http://localhost:3000/api/invoice', newRequest)
    .subscribe((responceData) => {
      console.log('responce', responceData);
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

deleteRequest(resId: string) {
  const currenInvoice = this.getCurrentInvoice();
  console.log('request', currenInvoice, resId );
  this.http.delete('http://localhost:3000/api/invoice/' + currenInvoice._id + '/' + resId)
    .subscribe((result) => {
      console.log(result);
      this.invoice.requests.splice(this.requestIndex, 1);
      this.requestUpdate.next(this.invoice.requests);
      this.getInvoices(this.currentInvoiceId);
    });
}

getAnimals() {
  return [
    'cow',
    'horse',
    'heffer',
    'calf',
    'bull',
    'steer',
    'pig',
    'sow',
    'boar',
    'barrel',
    'other'
  ];
}


}
