import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RouteService } from './route.service';

@Component({
  selector: 'app-route-dialog',
  template: `
  <h1 mat-dialog-title> Route </h1>
  <div mat-dialog-content>

    <form  #formData="ngForm">

      <mat-form-field class="item" >
        <input matInput
          [readonly]="editable"
          class="inputs"
          type='string'
          name='title'
          minLength="2"
          maxLength="2"
          required
          placeholder='Route title'
          [ngModel]="data.title"
        >
      </mat-form-field>

      <mat-form-field class="item" >
        <input matInput
          class="inputs"
          type='string'
          name='description'
          placeholder='description'
          [ngModel]="data.description"
        >
      </mat-form-field>

      <div mat-dialog-actions id="buttons">
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button
          mat-button
          *ngIf="!data._id"
          (click)="saveRoute(formData)"
          cdkFocusInitial
          >Submit</button>
        <button
          mat-button
          *ngIf="data._id"
          (click)="editRoute(formData)"
          cdkFocusInitial
          >Edit</button>
        <button
          mat-button
          *ngIf="data._id && !confirmDelete"
          id="delete"
          color="warn"
          (click)="checkDelete()"
          >Delete
        </button>
        <button
          mat-button
          *ngIf="confirmDelete"
          id="delete"
          color="warn"
          (click)="deleteRoute(formData)"
          >Delete cannot be undone
        </button>
      </div>
    </form>

  </div>
  `,
  styleUrls: ['../DC.component.css']
})
export class DCRouteComponent {

  confirmDelete = false;
  editable = false;

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCRouteComponent>,
    public routeService: RouteService,
    public router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      console.log(data);
      if (this.data._id) {this.editable = true; }
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveRoute(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    formData.value.title = formData.value.title.toUpperCase();
    console.log('new route data', formData.value);
    this.routeService.addRoute(formData.value);
    this.dialogRef.close();
  }

  editRoute(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    formData.value._id = this.data._id;
    formData.value.title = formData.value.title.toUpperCase();
    this.routeService.editRoute(formData.value);
    this.dialogRef.close();
  }

  deleteRoute() {
    this.routeService.deleteRoute(this.data._id);
    this.dialogRef.close();
  }

  checkDelete() {
    this.confirmDelete = true;
  }

}
