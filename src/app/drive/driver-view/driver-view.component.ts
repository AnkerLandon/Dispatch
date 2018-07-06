import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { RouteService } from '../../dispatch/route/route.service';
import { DriveService } from '../drive.service';
import { Invoice } from '../../models/invoice-data.model';
import { Customer } from '../../models/customers-data.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-driver-view-',
  templateUrl: './driver-view.component.html',
  styleUrls: ['../drive.component.css']
})
export class DriverViewComponent implements OnInit, OnDestroy {
  private invRouteSub: Subscription;
  public mergedData: any[];
  private driverRoute;

  constructor(
    private driveService: DriveService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      this.driverRoute = paramMap.get('route');
    });
    this.invRouteSub = this.driveService.getInvRouteUpdateListener()
      .subscribe((results: any[]) => {
        this.mergedData = results;
        console.log(this.mergedData);
      });
    this.driveService.getRouteInvoices(this.driverRoute);
  }

  ngOnDestroy() {
    this.invRouteSub.unsubscribe();
  }

}
