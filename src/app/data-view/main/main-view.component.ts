import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Customer } from '../../models/customers-data.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './main.service';
import { CustomerService } from '../customers/customer.service';
import { UserService } from '../users/user.service';


@Component({
  selector: 'app-main-view',
  templateUrl: 'main-view.component.html',
  styleUrls: ['../data-view.component.css']
})

export class MainViewComponent implements OnInit, OnDestroy {
  private records: any[] = [];
  private dataSubbscription: Subscription;

  public status;
  displayedColumns = [ 'edit'];
  dataSource = new MatTableDataSource(this.records);

  constructor(
    public mainService: MainService,
    public customerService: CustomerService,
    public userService: UserService,
    public route: ActivatedRoute) {
      console.log(this.route.snapshot.routeConfig.path);
    }

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSubbscription = this.mainService.getViewUpdateListener()
      .subscribe((records: any[]) => {
        this.setUp();
        this.dataSource.data = records;
        console.log(this.displayedColumns, records);
      });

    switch (this.route.snapshot.routeConfig.path) {
      case 'users':
        this.userService.getUsers();
        this.status = 'users';
        break;
      default:
        this.customerService.getCustomers();
        this.status = 'customers';
    }

  }

  ngOnDestroy() {
    this.dataSubbscription.unsubscribe();
  }

  addCustomerDialog() {
    const emptyCustomer = {
      _id: '',
      name: '',
      address: '',
      city: '',
      payment: null
    };
    this.mainService.openCustomerDialog(emptyCustomer);
  }

  addUserDialog() {
    const emptyCustomer = {
      _id: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: null,
      phone: null,
      rank: ''
    };
    this.mainService.openUserDialog(emptyCustomer);
  }

  editUserDialog(test: any) {
    console.log(test);
    this.mainService.openUserDialog(test);
  }


  setUp() {
    this.displayedColumns = this.mainService.display;
  }

}



