import {Component, Inject, EventEmitter, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Customer } from './customers-data.model';


/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {
  customer: Customer;
  no: number;
  name: string;

  @Output('customerAdded') customerAdded = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogBoxEditComponent, {
      data: {test: {no: this.no, name: this.name}}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.no = result.no;
      this.name = result.name;
      this.customer = new Customer(result.no, result.name);
      console.log(this.customer);
      this.customerAdded.emit(this.customer);
    });
  }
}

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
})
export class DialogBoxEditComponent {

  @Output() editMode = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

