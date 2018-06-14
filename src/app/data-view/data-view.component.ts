import {Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Customer } from '../customers-data.model';


@Component({
  selector: 'app-data-view',
  templateUrl: 'data-view.component.html',
  styleUrls: ['data-view.component.css']
})

export class DataViewComponent implements OnInit {
   customers: Customer[] = [];
   blankCustomer: Customer;

  // @Input() customerAdded: Customer;

  constructor() { this.setUp(); }

  displayedColumns = [ 'edit', 'id', 'name', 'address', 'city', 'payment'];
  // displayedColumns = this.customer.names;
  dataSource = new MatTableDataSource(this.customers);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('table') table: MatTable<Customer>;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addCustomer(nCust) {
    // this.customers.push(nCust);
    this.dataSource.data.push(nCust);
    // this.dataSource = this.customers;
    this.table.renderRows();
    console.log(this.dataSource);
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

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

 const ELEMENT_DATA: PeriodicElement[] = [
   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},

 ];

// const ELEMENT_DATA: PeriodicElement[] = [];


