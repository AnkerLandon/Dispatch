import {Component, Inject, EventEmitter, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatInputModule } from '@angular/material';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-dialog-add',
  templateUrl: './DC-Invoice.component.html',
  styleUrls: ['../DC.component.css']
})
export class DCInvoiceComponent {
  animals: string[] = [
    'cow',
    'heffer',
    'calf',
    'bull',
    'steer',
    'pig',
    'sow',
    'boar',
    'barrel',
    'other'];


  myKeys = this.getMyKeys(this.data);

  @Output() newRecord = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<DCInvoiceComponent>,
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
  saveInvoice(formData: NgForm) {
    if (formData.invalid) {
      return;
    }
    this.newRecord.emit(formData.value);
    this.dialogRef.close();
  }



}
