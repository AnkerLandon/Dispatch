import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomerService } from '../../dispatch/customers/customer.service';
import { MainService } from '../../dispatch/main/main.service';
import { PaymentService } from '../../dispatch/payments/payment.service';




@Component ({
  selector: 'app-context-nav',
  template: `

  <div fxLayout="column" id="test">
    <div fxFlex="100%" fxFlex.lt-md="50%">
     <div *ngIf="flag" >
        <mat-accordion>
           <mat-expansion-panel>
              <mat-expansion-panel-header>
                 <mat-panel-title>
                    {{customer.name}}
                 </mat-panel-title>
                 <mat-panel-description>

                 </mat-panel-description>
              </mat-expansion-panel-header>
              <div>
                <div>{{customer.companyName}}</div>
                <div>{{customer.address}}</div>
                <div>{{customer.city}}</div>
              </div>
              <mat-action-row>
                <button mat-icon-button >
                  <mat-icon
                    aria-label="icon-button with an add icon"
                    (click)='addCustomerDialog(customer)' >edit
                  </mat-icon>
                </button>
              </mat-action-row>
           </mat-expansion-panel>
        </mat-accordion>
     </div>
  </div>
  <div fxFlex="100%" fxFlex.lt-md="50%" >
     <mat-button-toggle-group
        id="toggle"
        [value]="currentLoc"
        name="Nav"
        aria-label="Navigation"
        fxLayout="column"
        fxLayout.lt-md="row">
        <mat-button-toggle value="invoices/:customerId" matTooltip="Invoices" (click)='gotoInvoices()' *ngIf="flag" >
          <mat-icon >list</mat-icon>
          <div fxShow fxHide.lt-md class="inline">Invoices</div>
        </mat-button-toggle>
        <mat-button-toggle value="payments/:customerId" matTooltip="Bills" (click)='gotoPayments()' *ngIf="flag">
          <mat-icon>payment</mat-icon>
          <div fxShow fxHide.lt-md class="inline">Bills</div>
        </mat-button-toggle>
        <mat-button-toggle value="customers" routerLink='/customers' matTooltip="Customers">
          <mat-icon>assignment_ind</mat-icon>
          <div fxShow fxHide.lt-md class="inline">Customers</div>
        </mat-button-toggle>
        <mat-button-toggle value="prices" routerLink='/prices' matTooltip="Prices">
          <mat-icon  >monetization_on</mat-icon>
          <div fxShow fxHide.lt-md class="inline"> Prices</div>
        </mat-button-toggle>
        <mat-button-toggle value="users" routerLink='/users' matTooltip="Users">
          <mat-icon>account_box</mat-icon>
          <div fxShow fxHide.lt-md class="inline">Users</div>
        </mat-button-toggle>
        <mat-button-toggle value="routes" routerLink='/routes' matTooltip="Routes">
          <mat-icon>directions_car</mat-icon>
          <div fxShow fxHide.lt-md class="inline">Routes</div>
        </mat-button-toggle>
        <mat-button-toggle value="driverView" routerLink='/driver' matTooltip="Driver View">
          <mat-icon>exit_to_app</mat-icon>
          <div fxShow fxHide.lt-md class="inline">Driver View</div>
        </mat-button-toggle>
     </mat-button-toggle-group>
  </div>
</div>

  `,
  styles: [`
  #test{

  }
  #button{
    float: right;
  }
  #toggle {
    width: 100%;
    height: 100%;
  }
  .inline {
    display: inline-block;
    padding-left: 5px;
  }

  `]
})

export class ContextComponent implements OnInit  {

  flag = false;
  currentLoc;
  customer: any = {
    _id: '',
    name: '',
    address: '',
    city: ''
  };
  private dataSubbscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    public mainService: MainService,
    public paymentService: PaymentService,
    public customerService: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.currentLoc = this.route.snapshot.routeConfig.path;
    console.log('current loc', this.currentLoc);
    this.dataSubbscription = this.customerService.getCurrentCustomerUpdateListener()
      .subscribe((records: any) => {
        this.refresh();
      });

    if (this.currentLoc === 'invoices/:customerId' || this.currentLoc === 'payments/:customerId') {
      this.customer = this.customerService.getCurrentCustomer();
      // this.paymentService.setAccount(this.customer._id);
      this.flag = true;
      // this.currentLoc = 'customers';
    } else {
      this.flag = false;
      // this.currentLoc = 'users';
    }
  }

  refresh() {
    this.customer = this.customerService.getCurrentCustomer();
  }

  addCustomerDialog(customerData) {
    this.mainService.openCustomerDialog(customerData);
  }

  gotoPayments() {
    this.paymentService.setAccount(this.customer._id);
    this.router.navigate(['/payments/' + this.customer._id]);
  }
  gotoInvoices() {
    this.router.navigate(['/invoices/' + this.customer._id]);
  }

}
