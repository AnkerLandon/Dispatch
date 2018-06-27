import { Component, Inject, EventEmitter, Output, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm, FormControl, Validators } from '@angular/forms';
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
  stateControl = new FormControl(undefined, [Validators.required, Validators.minLength(2), Validators.maxLength(2)]);
  isStateValid;

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
    this.isStateValid = this.states.indexOf(this.stateControl.value.toUpperCase());
    console.log(formData.value, this.stateControl, this.isStateValid);
    if ( this.isStateValid === -1) {
      return;
    }
    if (formData.invalid) {
      return;
    }
    formData.value.state = this.stateControl.value.toUpperCase();
    this.userService.addUser(formData.value);
    console.log(formData.value, this.stateControl);
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
