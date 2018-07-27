import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DriveService } from '../drive.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DCDriverComponent } from './driver-dialog.component';

@Component({
  selector: 'app-driver-view-',
  templateUrl: './driver-view.component.html',
  styleUrls: ['../drive.component.css']
})
export class DriverViewComponent implements OnInit, OnDestroy {
  private invRouteSub: Subscription;
  public mergedData: any[] = [];
  private driverRoute;

  constructor(
    private driveService: DriveService,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.driverRoute = this.route.snapshot.params.route;
    this.driveService.getRouteInvoices(this.driverRoute);
  }

  ngOnInit() {
    this.invRouteSub = this.driveService.getInvRouteUpdateListener()
      .subscribe((results: any[]) => {
        this.mergedData = results;
        console.log('merged Data', this.mergedData);
      });
    // this.driveService.getRouteInvoices(this.driverRoute);
  }

  ngOnDestroy() {
    this.invRouteSub.unsubscribe();
  }

  onChange( invoiceId: string, requestId: string, checked: any, index: number) {
    console.log('test', invoiceId, requestId, checked);
    const changed = this.mergedData.find(d => d.invoiceId === invoiceId);
    changed.requests[index].complete = checked;
    console.log('result', changed);


  }

  submit(invoiceId: string) {
    const invoice = this.mergedData.find(I => I.invoiceId === invoiceId);
    this.openPaymentDialog(invoice);
    console.log('submit', invoice);
    // this.driveService.completeRequests(invoice);
  }

  test() {
    console.log('test:', this.mergedData);
  }

  openPaymentDialog(form: any): void {
    const dialogRef = this.dialog.open(DCDriverComponent, {
        maxWidth: '50vw',
        data:  form,
        disableClose: true
      });
    console.log(dialogRef);
    }

}

interface Result {
  invoiceId?: string;
  status?: Array<any>;
}
