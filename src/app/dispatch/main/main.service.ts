import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerService } from '../customers/customer.service';
import { UserService } from '../users/user.service';
import { MatDialog } from '@angular/material';
import { DCCustomerComponent } from '../customers/DC-Customer.component';
import { DCUserComponent } from '../users/DC-User.component';
import { PriceService } from '../prices/price.service';
import { DCPriceComponent } from '../prices/DC-Price.component';
import { RouteService } from '../route/route.service';
import { DCRouteComponent } from '../route/DC-Route.component';
import { PaymentService } from '../payments/payment.service';
import { InvoiceService } from '../invoices/invoice.service';
import { DCInvoiceComponent } from '../invoices/DC-Invoice.component';
import { DCPaymentComponent } from '../payments/DC-Payment.component';

@Injectable({providedIn: 'root'})
export class MainService {

  public view: any[];
  public subView: any[];
  public display: any[];
  public subDisplay: any[];

  private customerSub: Subscription;
  private userSub: Subscription;
  private priceSub: Subscription;
  private routeSub: Subscription;
  private paymentSub: Subscription;
  private invoiceSub: Subscription;
  private requestSub: Subscription;

  private viewUpdate = new Subject<any[]>();
  private subViewUpdate = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    public customerService: CustomerService,
    public userService: UserService,
    private priceService: PriceService,
    private routeService: RouteService,
    private paymentService: PaymentService,
    private invoiceService: InvoiceService,
    public dialog: MatDialog,

  ) {
    this.routeService.getRoutes(false);
    this.customerSub = this.customerService.getDataUpdateListener()
      .subscribe((records: any[]) => {
        this.view = records;
        this.display = this.customerView();
        this.viewUpdate.next([...this.view]);
      });
    this.userSub = this.userService.getUsersUpdateListener()
      .subscribe((users: any[]) => {
        this.view = users;
        this.display = this.userView();
        this.viewUpdate.next([...this.view]);
      });
    this.priceSub = this.priceService.getPricesUpdateListener()
    .subscribe((prices: any[]) => {
      this.view = prices;
      this.display = this.priceView();
      this.subDisplay = this.subPriceView();
      this.viewUpdate.next([...this.view]);
    });
    this.routeSub = this.routeService.getRoutesUpdateListener()
    .subscribe((routes: any[]) => {
      this.view = routes;
      this.display = this.routeView();
      this.viewUpdate.next([...this.view]);
    });
    this.paymentSub = this.paymentService.getPaymentUpdateListener()
    .subscribe((payments: any[]) => {
      this.view = payments;
      this.display = this.paymentView();
      this.viewUpdate.next([...this.view]);
    });
    this.invoiceSub = this.invoiceService.getInvoicesUpdateListener()
    .subscribe((invoices: any[]) => {
      this.view = invoices;
      this.display = this.invoiceView();
      this.viewUpdate.next([...this.view]);
    });
    this.requestSub = this.invoiceService.getRequestUpdateListener()
    .subscribe((records: any[]) => {
      this.subView = records;
      this.subViewUpdate.next([...records]);
    });
  }

  openCustomerDialog(form: any): void {
    const dialogRef = this.dialog.open(DCCustomerComponent, {
      maxWidth: '50vw',
      data:  form,
      disableClose: true
    });
  }

  openUserDialog(form: any): void {
    const dialogRef = this.dialog.open(DCUserComponent, {
      maxWidth: '50vw',
      data:  form,
      disableClose: true
    });
  }

  openPriceDialog(form: any): void {
    const dialogRef = this.dialog.open(DCPriceComponent, {
      maxWidth: '50vw',
      data:  form,
      disableClose: true
    });
  }

  openRouteDialog(form: any): void {
    const dialogRef = this.dialog.open(DCRouteComponent, {
      maxWidth: '50vw',
      data:  form,
      disableClose: true
    });
  }

  openInvoiceDialog(form: any): void {
    const dialogRef = this.dialog.open(DCInvoiceComponent, {
      maxWidth: '50vw',
      data:  form,
      disableClose: true
    });
  }

  openRequestDialog(form: any): void {
    const dialogRef = this.dialog.open(DCInvoiceComponent, {
      maxWidth: '50vw',
      data:  form,
      disableClose: true
    });
  }

  openPaymentDialog(form: any): void {
    const dialogRef = this.dialog.open(DCPaymentComponent, {
      maxWidth: '50vw',
      data:  form,
      disableClose: true
    });
  }

  getViewUpdateListener() {
    return this.viewUpdate.asObservable();
  }

  getSubViewUpdateListener() {
    return this.subViewUpdate.asObservable();
  }

  customerView() {
    return [
      'edit',
      'companyName',
      'name',
      'route',
      'currentPlan'
    ];
  }

  userView() {
    return [
      'edit',
      'userName',
      'address',
      'city',
      'rank'
    ];
  }

  priceView() {
    return [
      'edit',
      'date',
      'tax',
      'pickup',
      'subscription'
    ];
  }

  subPriceView() {
    return [
      'edit',
      'animal',
      'feeAmount',
      'taxable',
      'appliesToo'
    ];
  }

  routeView() {
    return [
      'edit',
      'title',
      'description'
    ];
  }

  paymentView() {
    return [
      'edit',
      'createdDate',
      'billType',
      'amountDue',
      'paymentType',
      'paymentAmount',
      'checkNumber'
    ];
  }
  invoiceView() {
    return [
      'edit',
      'date'
    ];
  }
  requestView() {
    return [
      'edit',
      'number',
      'animal',
      'other',
      'complete'
    ];
  }
}
