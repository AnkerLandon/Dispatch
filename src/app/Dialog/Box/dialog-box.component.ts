import {Component, Inject, EventEmitter, Output, Input } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Customer } from '../../customers-data.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css']
})
export class DialogBoxComponent {

  constructor(public dialog: MatDialog) { }

  @Input() myCustomer: Customer;

  test = DialogBoxAddComponent;


  @Output('customerAdded') customerAdded = new EventEmitter();

  openDialog(cust: Customer): void {
    this.myCustomer = cust;
    const dialogRef = this.dialog.open(this.test, {
      maxWidth: '50vw',
      data: this.myCustomer});
    const sub = dialogRef.componentInstance.newCustomer.subscribe((newData: any) => {
      this.customerAdded.emit(newData);
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-content.component.css']
})
export class DialogBoxAddComponent {
  myKeys = this.getMyKeys(this.data);

  @Output() newCustomer = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DialogBoxAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  getMyKeys(myData) {
    return Object.keys(myData);
  }
  getType(myIn) {
    return typeof this.data[myIn];
  }
  saveCustomer(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.newCustomer.emit(formData.value);
    this.dialogRef.close();
  }


}


