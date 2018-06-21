import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Customer } from '../../models/customers-data.model';
import { CustomerService } from '../../data-view/customers/customer.service';


@Component ({
  selector: 'app-context-nav',
  template: `
  <mat-card id='side' >
    <div *ngIf="customer.name" >
      <div id='bold' >{{customer.name}}</div>
      <div>{{customer.address}}</div>
      <div>{{customer.city}}</div>
    </div>
  </mat-card>
  `,
  styles: [`
  #side{

  }
  #bold{
    font-weight: bold;
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
