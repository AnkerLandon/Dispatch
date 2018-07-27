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
  private mapPayment: Payment;
  private AId: string;

  private tempPayments = {
    _id: 'tse',
    accountId: 'teh',
    paymentFor: 'test',
    paymentType: 'test',
    paymentAmount: 2,
    checkNumber: 23
  };

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
        console.log('test', paymentData);
        return paymentData.documents;
      }))
      .subscribe(transPayments => {
        console.log('trans', transPayments);
        this.payments = transPayments;
        console.log('payments Get', this.payments);
        this.paymentUpdate.next([...this.payments]);
      });
      // this.payments.push(this.tempPayments);
      // this.paymentUpdate.next([...this.payments]);
  }

  newBill(newBill: Payment) {
    console.log('service payment data', newBill);
    this.http.post
      (BACKEND_URL + '/new/', newBill)
      .subscribe((responceData: any) => {/*
        const myCust_id = responceData.custId ;
        newCustomer._id = myCust_id;
        newCustomer.planLog = [{plan: newCustomer.currentPlan, start: new Date}];
        this.customers.push(newCustomer);
        this.dataUpdate.next([...this.customers]);*/
      });
  }

  addPayment() {

  }


  getPaymentUpdateListener() {
    return this.paymentUpdate.asObservable();
  }
}
