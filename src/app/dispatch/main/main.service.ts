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

@Injectable({providedIn: 'root'})
export class MainService {

  view: any[];
  display: any[];

  private customerSub: Subscription;
  private userSub: Subscription;
  private priceSub: Subscription;
  private routeSub: Subscription;

  private viewUpdate = new Subject<any[]>();

  constructor(
    private http: HttpClient,
    public customerService: CustomerService,
    public userService: UserService,
    private priceService: PriceService,
    private routeService: RouteService,
    public dialog: MatDialog,

  ) {
    console.log('flag 2');
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
      this.viewUpdate.next([...this.view]);
    });
    this.routeSub = this.routeService.getRoutesUpdateListener()
    .subscribe((routes: any[]) => {
      this.view = routes;
      this.display = this.routeView();
      this.viewUpdate.next([...this.view]);
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

  getViewUpdateListener() {
    return this.viewUpdate.asObservable();
  }

  customerView() {
    return [
      'edit',
      'companyName',
      'name',
      'city',
      'township',
      'route',
      'currentPlan'
    ];
  }

  userView() {
    return [
      'edit',
      'userName',
      'firstName',
      'lastName',
      'address',
      'city',
      'phone',
      'rank'
    ];
  }

  priceView() {
    return [
      'edit',
      'date',
      'cow',
      'heffer',
      'calf',
      'bull',
      'steer',
      'pig',
      'sow',
      'boar',
      'barrel',
      'subscription'
    ];
  }

  routeView() {
    return [
      'edit',
      'title',
      'description'
    ];
  }

}
