import {Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Customer } from '../../models/customers-data.model';
import { InvoiceService } from './invoice.service';
import { CustomerService } from '../customers/customer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Request } from '../../models/invoice-data.model';


@Component({
  selector: 'app-data-view',
  templateUrl: 'invoice-view.component.html',
  styleUrls: ['../data-view.component.css']
})

export class InvoiceViewComponent implements OnInit, OnDestroy {
  private records: any[] = [];
  private dataSubbscription: Subscription;
  private customerId: string;

  flag = false;
  view: any;
  displayedColumns = [ 'edit', 'date', 'total', 'pickupFee', 'requests'];
  dataSource = new MatTableDataSource(this.records);

  constructor(
    public invoiceService: InvoiceService,
    public customerService: CustomerService,
    public route: ActivatedRoute) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
        this.customerId = paramMap.get('customerId');
        console.log('cust', this.customerId);
    });

    this.customerService.setCurrentCustomer(this.customerId);
    this.invoiceService.getInvoices(this.customerId);
    this.setUp();
    this.dataSource.sort = this.sort;
    this.dataSubbscription = this.invoiceService.getInvoicesUpdateListener()
      .subscribe((records: any[]) => {
        this.dataSource.data = records;
        console.log('data', this.dataSource.data);
      });
  }

  ngOnDestroy() {
    this.dataSubbscription.unsubscribe();
  }

  openRecords(myId: string) {
    this.flag = true;
    this.invoiceService.setRequest(myId);
  }

  setUp() {
    this.view = {
      accountId: this.customerId,
      _id: '',
      number: null,
      animal: '',
      other: '',
      complete: false,
      price: null};
  }

}
