import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Customer } from '../../models/customers-data.model';
import { CustomerService } from './customer.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer-data-view',
  templateUrl: 'customer-view.component.html',
  styleUrls: ['../data-view.component.css']
})

export class CustomerViewComponent implements OnInit, OnDestroy {
  private records: any[] = [];
  private dataSubbscription: Subscription;

  view: any;
  customer: Customer;
  displayedColumns = [ 'edit'];
  dataSource = new MatTableDataSource(this.records);

  constructor(public recordService: CustomerService, public route: ActivatedRoute) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.recordService.getCustomers();
    this.setUp();
    this.dataSource.sort = this.sort;
    this.dataSubbscription = this.recordService.getDataUpdateListener()
      .subscribe((records: any[]) => {
        this.dataSource.data = records;
        console.log(this.dataSource.data);
      });
  }

  ngOnDestroy() {
    this.dataSubbscription.unsubscribe();
  }


  setUp() {
    this.view = { _id: '', name: '', address: '', city: '', payment: null};
    this.displayedColumns = this.displayedColumns.concat(Object.keys(this.view));
    this.displayedColumns.splice(this.displayedColumns.indexOf('_id'), 1);
  }

}



