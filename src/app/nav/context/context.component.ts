import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from '../../models/customers-data.model';
import { CustomerService } from '../../data-view/customers/customer.service';
import { InvoiceViewComponent } from '../../data-view/invoices/invoice-view.component';




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
                 <div>{{customer.address}}</div>
                 <div>{{customer.city}}</div>
              </div>
              <mat-action-row>
                <button mat-icon-button >
                  <app-db-customer [myForm]="customer"></app-db-customer>
                </button>
              </mat-action-row>
           </mat-expansion-panel>
        </mat-accordion>
     </div>
  </div>
  <div fxFlex="100%" fxFlex.lt-md="50%" >
     <mat-button-toggle-group
        id="toggle"
        value="Customers"
        name="Nav"
        aria-label="Navigation"
        fxLayout="column"
        fxLayout.lt-md="row">
        <mat-button-toggle value="Customers">Customers</mat-button-toggle>
        <mat-button-toggle value="Prices">Prices</mat-button-toggle>
        <mat-button-toggle value="Accounts">Accounts</mat-button-toggle>
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
  customer: Customer = {
    id: '',
    name: '',
    address: '',
    city: '',
    payment: null
  };
  private dataSubbscription: Subscription;

  constructor(
    public route: ActivatedRoute,
    public customerService: CustomerService
  ) {}

  ngOnInit() {
    this.dataSubbscription = this.customerService.test()
      .subscribe((records: any) => {
        this.refresh();
      });
    if (this.route.component === InvoiceViewComponent) {
      this.customer = this.customerService.getCurrentCustomer();
      this.flag = true;
    } else {
      this.flag = false;
    }
  }

  refresh() {
    this.customer = this.customerService.getCurrentCustomer();
  }



}
