import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouteService } from '../../dispatch/route/route.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-route-select',
  template: `
    <mat-grid-list cols="2" rowHeight="150px">
      <mat-grid-tile *ngFor="let item of routes">
        <button mat-raised-button class='route-button' (click)="router.navigate(['/driver/' + item])">
          <mat-icon>assignment</mat-icon>
          {{item}}
        </button>
      </mat-grid-tile>
    </mat-grid-list>
  `,
  styleUrls: ['../drive.component.css']
})
export class RouteSelectComponent implements OnInit, OnDestroy {

  public routes: any;
  private routeSub: Subscription;

  constructor(
    private routeService: RouteService,
    public router: Router
  ) {}

  ngOnInit() {
    this.routeSub = this.routeService.getRouteArrayUpdateListener()
      .subscribe((results: any[]) => {
        this.routes = results;
      });
    this.routeService.getRoutes(true);
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
