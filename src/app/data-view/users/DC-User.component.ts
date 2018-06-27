import { Component, Inject, EventEmitter, Output, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { User } from '../../models/user-data.model';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './DC-User.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCUserComponent implements OnInit {
  user: User;
  states = [
    'AL', 'MO', 'AK', 'MT', 'AZ', 'NE', 'AR', 'NV', 'CA', 'NH',
    'CO', 'NJ', 'CT', 'NM', 'DE', 'NY', 'DC', 'NC', 'FL', 'ND',
    'GA', 'OH', 'HI', 'OK', 'ID', 'OR', 'IL', 'PA', 'IN', 'RI',
    'IA', 'SC', 'KS', 'SD', 'KY', 'TN', 'LA', 'TX', 'ME', 'UT',
    'MD', 'VT', 'MA', 'VA', 'MI', 'WA', 'MN', 'WV', 'MS', 'WI',
    'WY',
  ];

  confirmDelete = false;

  @Output() newRecord = new EventEmitter();
  filteredOptions: Observable<string[]>;
  stateControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<DCUserComponent>,
    public userService: UserService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
    }

  ngOnInit() {
    this.filteredOptions = this.stateControl.valueChanges
      .pipe(
        startWith(this.data.state),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();

    return this.states.filter(option => option.includes(filterValue));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveUser(formData: NgForm) {
    if (formData.invalid && this.stateControl.invalid) {
      return;
    }
    // this.customerService.addCustomer(formData.value);
    formData.value.state = this.stateControl.value;
    console.log(formData.value);
    this.dialogRef.close();
  }

  editUser(formData: NgForm) {
    console.log(this.data._id, formData.value);
    if (formData.invalid) {
      return;
    }

    // this.customerService.editCustomer(this.data._id, formData.value);
    this.dialogRef.close();
  }

  deleteUser() {
    // this.customerService.deleteCustomer(this.data._id);
    this.router.navigate(['']);
    this.dialogRef.close();
  }

  checkDelete() {
    this.confirmDelete = true;
  }

}
