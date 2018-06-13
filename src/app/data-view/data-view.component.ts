import {Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import { Customer } from './customers-data.model';


@Component({
  selector: 'app-data-view',
  templateUrl: 'data-view.component.html',
  styleUrls: ['data-view.component.css']
})

export class DataViewComponent implements OnInit {
   customers: Customer[] = [new Customer(1456, 'Hydrogen', 1.0079, 'f')];
   myCustomer: Customer;

  @Input() customerAdded: Customer;

  // this.customers.push(this.customerAdded);

  displayedColumns = [ 'edit', 'position', 'name', 'weight', 'symbol'];
  // displayedColumns = this.customer.names;
  dataSource = new MatTableDataSource(this.customers);

  @ViewChild(MatSort) sort: MatSort;

   ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  addCustomer(nCust) {
    this.customers.push(nCust);
    console.log(this.customers);
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


