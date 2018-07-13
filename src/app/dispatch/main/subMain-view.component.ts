import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-sub-view',
  template: `
  <mat-card>
  <mat-card-title>{{status}}</mat-card-title>
  <table mat-table #table [dataSource]="dataSource" matSort class="mat-z8">
    <ng-container matColumnDef="edit">
      <th mat-header-cell *matHeaderCellDef >
        <div class="onSeam">
          <button mat-mini-fab matTooltip="New {{status}}" *ngIf="status === 'Requests'">
            <mat-icon
              aria-label="icon-button with an add icon"
              (click)='add()' >add
            </mat-icon>
          </button>
        </div>
      </th>
      <td mat-cell *matCellDef="let element">
        <button mat-icon-button matTooltip="open in new" *ngIf="status === 'Requests'">
          <mat-icon
              aria-label="expand icon"
              (click)="edit(element)"
              >launch
          </mat-icon>
        </button>
      </td>
    </ng-container>
    <ng-container *ngFor="let col of displayedColumns | slice:1" matColumnDef= {{col}}>
      <th mat-header-cell *matHeaderCellDef mat-sort-header > {{ col }} </th>
      <td  mat-cell *matCellDef="let row"> {{row[col]}} </td>
    </ng-container>
    <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</mat-card>
  `,
  styleUrls: ['../data-view.component.css']
})
export class SubMainViewComponent implements OnInit {

  @Input() records: any[];
  @Input() status: any;
  @Input() displayedColumns: any[];

  public dataSource = new MatTableDataSource(this.records);

  @Output() addEvent = new EventEmitter<string>();
  @Output() editEvent = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {
    console.log('sub data', this.records, this.displayedColumns);
    this.dataSource.data = this.records;
  }

  add() {
    this.addEvent.emit(this.status);
  }

  edit(data) {
    this.editEvent.emit(data);
  }
}
