import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Payment } from '../../models/payment-data.model';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/payment';

@Injectable({providedIn: 'root'})
export class PaymentService {

  private payments: Payment[] = [];
  private AId: string;

  private paymentUpdate = new Subject<Payment[]>();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  setAccount(AId: string) {
    this.AId = AId;
  }

  getPayments() {
    this.http.get
      <{documents}>
      (BACKEND_URL + '/get/' + this.AId)
      .pipe(map((paymentData) => {
        return paymentData.documents;
      }))
      .subscribe(transPayments => {
        this.payments = transPayments;
        this.paymentUpdate.next([...this.payments]);
      });
  }

  newBill(newBill: Payment) {
    console.log('service payment data', newBill);
    this.http.post
      (BACKEND_URL + '/new/', newBill)
      .subscribe((responceData: any) => {});
  }

  addPayment(paymentData: any) {
    this.http.put(BACKEND_URL + '/addPayment/'
    + paymentData._id, paymentData.payment)
    .subscribe((response: any) => {
      this.getPayments();
    });
  }


  getPaymentUpdateListener() {
    return this.paymentUpdate.asObservable();
  }
}
