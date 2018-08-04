import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { Payment, Bill } from '../../models/payment-data.model';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/payment';

@Injectable({providedIn: 'root'})
export class PaymentService {

  private bills: Bill[] = [];
  private payments: Payment[] = [];
  private AId: string;
  private BId: string;

  private billUpdate = new Subject<Bill[]>();
  private paymentUpdate = new Subject<Payment[]>();

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  setAccount(AId: string) {
    this.AId = AId;
  }

  setBill(BId: string) {
    this.BId = BId;
    this.payments = this.bills.find( b => b._id === BId).payments;
  }

  getBillId() {
    return this.BId;
  }

  getTotals() {
    const bill = this.bills.find( b => b._id === this.BId);
    const due = bill.amountDue;
    let paid = 0;
    for ( let i = 0; i < bill.payments.length; i++) {
      paid += parseFloat(bill.payments[i].paymentAmount);
    }
    return {due, paid};
  }

  getBills() {
    this.http.get
      <{documents}>
      (BACKEND_URL + '/get/' + this.AId)
      .pipe(map((paymentData) => {
        return paymentData.documents;
      }))
      .subscribe(transPayments => {
        this.bills = transPayments;
        this.billUpdate.next([...this.bills]);
      });
  }

  newBill(newBill: Bill) {
    this.http.post
      (BACKEND_URL + '/new/', newBill)
      .subscribe((responceData: any) => {
        this.getBills();
      });
  }

  addPayment(paymentData: any) {
    this.http.put(BACKEND_URL + '/addPayment/'
    + this.BId, paymentData.payment)
    .subscribe((response: any) => {
      this.payments.push(response.newPayment);
      this.paymentUpdate.next([...this.payments]);
    });
  }

  editPayment(BId: string, PId: string, payment: Payment) {
    this.http.put(BACKEND_URL + '/edit/' + BId + '/' + PId, payment)
    .subscribe((Response: any) => {

    });
  }


  getPaymentUpdateListener() {
    return this.paymentUpdate.asObservable();
  }

  getBillUpdateListener() {
    return this.billUpdate.asObservable();
  }
}
