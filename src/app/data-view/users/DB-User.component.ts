import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { DCUserComponent } from './DC-User.component';
import { UserViewComponent } from './user-view.component';


@Component({
  selector: 'app-db-user',
  template: `
    <div *ngIf="(myForm)">
      <mat-icon
        aria-label="icon-button with an add icon"
        (click)='openDialog(myForm)' >{{title}}
      </mat-icon>
    </div>
    `,
  styleUrls: ['../dialog-box.component.css']
})
export class DBUserComponent implements OnInit {

  title = 'edit';
  @Input() myForm: any;

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    if (this.route.component === UserViewComponent) {
      this.title = 'add';
    }
  }

  openDialog(form: any): void {
    const dialogRef = this.dialog.open(DCUserComponent, {
      maxWidth: '50vw',
      data:  form
    });
  }
}



