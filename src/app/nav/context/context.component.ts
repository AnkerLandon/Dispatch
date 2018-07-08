import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from '../../models/customers-data.model';
import { CustomerService } from '../../dispatch/customers/customer.service';
import { InvoiceViewComponent } from '../../dispatch/invoices/invoice-view.component';
import { MainService } from '../../dispatch/main/main.service';




@Component ({
  selector: 'app-context-nav',
  template: `

  <div fxLayout="column" fxLayout.lt-md="row" id="test">
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
        <mat-button-toggle value="customers" routerLink='/customers'>
          <mat-icon>assignment_ind</mat-icon>
          Customers
        </mat-button-toggle>
        <mat-button-toggle value="prices" routerLink='/prices'>
          <mat-icon>monetization_on</mat-icon>
          Prices
        </mat-button-toggle>
        <mat-button-toggle value="users" routerLink='/users'>
          <mat-icon>account_box</mat-icon>
          Users
        </mat-button-toggle>
        <mat-button-toggle value="routes" routerLink='/routes'>
          <mat-icon>directions_car</mat-icon>
          Routes
        </mat-button-toggle>
        <mat-button-toggle value="driverView" routerLink='/driver'>
          <mat-icon>exit_to_app</mat-icon>
          Driver View
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
    public customerService: CustomerService
  ) {}

  ngOnInit() {
    this.currentLoc = this.route.snapshot.routeConfig.path;
    this.dataSubbscription = this.customerService.getCurrentCustomerUpdateListener()
      .subscribe((records: any) => {
        this.refresh();
      });

    if (this.route.component === InvoiceViewComponent) {
      this.customer = this.customerService.getCurrentCustomer();
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


}
