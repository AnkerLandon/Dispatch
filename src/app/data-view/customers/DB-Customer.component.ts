import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import { CustomerService } from './customer.service';
import { DCCustomerComponent } from './DC-Customer.component';
import { ActivatedRoute } from '@angular/router';
import { CustomerViewComponent } from '../customers/customer-view.component';


@Component({
  selector: 'app-db-customer',
  template: `
    <div *ngIf="(myForm)">
      <mat-icon
        aria-label="icon-button with an add icon"
        (click)=openCustomerDialog(myForm) >{{title}}
      </mat-icon>
    </div>
    `,
  styleUrls: ['../dialog-box.component.css']
})
export class DBCustomerComponent implements OnInit {

  title = 'edit';
  @Input() myForm: any;

  constructor(
    public dialog: MatDialog,
    public customerService: CustomerService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.component === CustomerViewComponent) {
      this.title = 'add';
    }
  }

  openCustomerDialog(data: any) {
    if (data.name) {
      this.openDialogEdit(data);
    } else {
      this.openDialogAdd(data);
    }
  }

  openDialogAdd(test: any): void {
    const dialogRef = this.dialog.open(DCCustomerComponent, {
      maxWidth: '50vw',
      data:  test
    });
  }

  openDialogEdit(test: any): void {
    const dialogRef = this.dialog.open(DCCustomerComponent, {
      maxWidth: '50vw',
      data:  test
    });
  }
}



