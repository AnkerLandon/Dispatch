import { Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule} from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './DC-Customer.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCCustomerComponent {
  myKeys = this.getMyKeys(this.data);

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCCustomerComponent>,
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
    console.log(formData.value);
    if (formData.invalid) {
      return;
    }
    this.newRecord.emit(formData.value);
    this.dialogRef.close();
  }

}
