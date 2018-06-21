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
  </mat-card>
  `,
  styles: [`
  #side{

  }
  #bold{
    font-weight: bold;
  }
  #button{
    float: right;
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
