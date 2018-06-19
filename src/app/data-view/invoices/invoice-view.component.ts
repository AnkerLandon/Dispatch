import {Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Customer } from '../../models/customers-data.model';
import { InvoiceService } from './invoice.service';
import { CustomerService } from '../customers/customer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-data-view',
  templateUrl: 'invoice-view.component.html',
  styleUrls: ['../data-view.component.css']
})

export class InvoiceViewComponent implements OnInit, OnDestroy {
  private records: any[] = [];
  private dataSubbscription: Subscription;
  private customerId: string;

  view: any;
  customer: Customer;
  displayedColumns = [ 'edit', 'date', 'requests', 'total'];
  dataSource = new MatTableDataSource(this.records);

  constructor(
    public invoiceService: InvoiceService,
    public customerService: CustomerService,
    public route: ActivatedRoute) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('customerId')) {
        this.customerId = paramMap.get('customerId');
        this.customer = this.customerService.getCustomer(this.customerId);
      }
    });
    this.invoiceService.getInvoices(this.customerId);
    this.setUp();
    this.dataSource.sort = this.sort;
    this.dataSubbscription = this.invoiceService.getInvoicesUpdateListener()
      .subscribe((records: any[]) => {
        this.dataSource.data = records;
      });
  }

  ngOnDestroy() {
    this.dataSubbscription.unsubscribe();
  }


  setUp() {
    this.view = {
      accountId: this.customerId,
      id: '',
      number: 0,
      animal: '',
      other: '',
      complete: false,
      price: 0};
  }

}
