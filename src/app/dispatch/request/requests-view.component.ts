import { Component, OnInit, ViewChild, OnDestroy  } from '@angular/core';
import {MatSort, MatTableDataSource, MatTable} from '@angular/material';
import { InvoiceService } from '../invoices/invoice.service';
import { Subscription } from 'rxjs';
import { Request, Invoice } from '../../models/invoice-data.model';

@Component({
  selector: 'app-record-view',
  templateUrl: 'requests-view.component.html',
  styles: [`
  table {
    width: 100%;
  }
  `]
})
export class RequestsViewComponent implements OnInit, OnDestroy {
  private requestSubbscription: Subscription;
  private requests: Request[];
  public invoice: Invoice;
  displayedColumns = ['edit', 'number', 'animal', 'other', 'complete', 'price'];
  dataSource = new MatTableDataSource(this.requests);

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public requestService: InvoiceService) {}

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.requestSubbscription = this.requestService.viewRequestUpdate()
      .subscribe((inInvoice: Invoice) => {
        this.dataSource.data = inInvoice.requests;
        this.invoice = inInvoice;
        console.log('Invoice?', this.invoice, this.invoice.requests);
      });
  }

  ngOnDestroy() {
    this.requestSubbscription.unsubscribe();
  }


}

