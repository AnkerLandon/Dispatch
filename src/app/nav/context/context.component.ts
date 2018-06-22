import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from '../../models/customers-data.model';
import { CustomerService } from '../../data-view/customers/customer.service';
import { DBCustomerComponent } from '../../data-view/customers/DB-Customer.component';



@Component ({
  selector: 'app-context-nav',
  template: `
  <mat-card id='side' >
    <div *ngIf="customer.name" >
      <div id='bold' >
        {{customer.name}}
        <button mat-icon-button matTooltip="edit Customer" id="button" >
          <app-db-customer
            [myForm]="customer">
          </app-db-customer>
        </button>
      </div>
    </div>
      <div fxHide.lt-md="true" fxHide="false">{{customer.address}}</div>
      <div fxHide.lt-md="true" fxHide="false">{{customer.city}}</div>
    <div></div>

    <mat-button-toggle-group value="bold"
      id="toggle"
      name="Nav"
      aria-label="Navigation"
      fxLayout="column"
      fxLayout.lt-md="row">
      <mat-button-toggle value="bold">Bold</mat-button-toggle>
      <mat-button-toggle value="italic">Italic</mat-button-toggle>
      <mat-button-toggle value="underline">Underline</mat-button-toggle>
    </mat-button-toggle-group>

  </mat-card>
  `,
  styles: [`
  #toggle{
    margin-top: 34px !important;
    margin-left: -25px !important;
    margin-bottom: -25px !important;
    width: 200px;
  }
  #side{
  }
  #bold{
    font-weight: bold;
  }
  #button{
    float: right;
  }
  #splitter{
    margin-top: 20px !important;
    margin-bottom: 20px !important;
    padding-bottom: 2rem !important;
  }
  `]
})

export class ContextComponent implements OnInit  {

  customer: Customer;
  customerId: string;
  test: Subscription;

  constructor(
    public route: ActivatedRoute,
    public customerService: CustomerService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.customerId = paramMap.get('customerId');
        this.customer = this.customerService.getCustomer(this.customerId);
        this.customer.id = this.customerId;
      } else {
        this.customer = {
          id: '',
          name: '',
          address: '',
          city: '',
          payment: null
        };
      }
    });
  }





}
