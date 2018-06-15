import {Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Customer } from '../customers-data.model';
import { DialogBoxAddComponent } from '../Dialog/Box/dialog-box.component';
import { RecordService } from './record.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-data-view',
  templateUrl: 'data-view.component.html',
  styleUrls: ['data-view.component.css']
})

export class DataViewComponent implements OnInit, OnDestroy {
  private customers: Customer[] = [];
  blankCustomer: Customer;
  private customerSubbscription: Subscription;

  constructor(public recordService: RecordService) {}

  displayedColumns = [ 'edit', 'id', 'name', 'address', 'city', 'payment'];
  dataSource = new MatTableDataSource(this.customers);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.setUp();
    this.customers = this.recordService.getCustomers();
    this.customerSubbscription = this.recordService.getDataUpdateListener()
      .subscribe((customers: Customer[]) => {
        this.dataSource.data = customers;
      });
  }

  ngOnDestroy() {
    this.customerSubbscription.unsubscribe();
  }


  setUp() {
    this.blankCustomer = {
      id: 0,
      name: '',
      address: '',
      city: '',
      payment: null
    };
  }

}



