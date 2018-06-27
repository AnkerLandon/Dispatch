import {Component, OnInit, ViewChild, Input, OnDestroy } from '@angular/core';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { Subscription } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { UserService } from './user.service';
import { User } from '../../models/user-data.model';


@Component({
  selector: 'app-user-view',
  templateUrl: 'user-view.component.html',
  styleUrls: ['../data-view.component.css']
})

export class UserViewComponent implements OnInit, OnDestroy {
  private dataSubbscription: Subscription;
  private users: User[] = [];

  view: any;
  displayedColumns = ['edit', 'firstName', 'lastName', 'email', 'address', 'phone', 'status'];
  dataSource = new MatTableDataSource(this.users);

  constructor(
    public userService: UserService,
    public route: ActivatedRoute) {}

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit() {
    this.userService.getUsers();
    this.setUp();
    this.dataSource.sort = this.sort;
    /*
    this.dataSubbscription = this.userService.getUsersUpdateListener()
      .subscribe((rcvdUsers: User[]) => {
        this.dataSource.data = rcvdUsers;
      });
  */
     this.dataSource.data = this.view;
  }

  ngOnDestroy() {
    this.dataSubbscription.unsubscribe();
  }

  setUp() {
    this.view = {
      _id: '',
      email: '',
      password: '',
      firstName: '',
      LastName: '',
      address: '',
      city: '',
      state: '',
      zip: null,
      phone: null};
  }

}
