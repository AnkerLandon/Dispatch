import { Component, OnInit } from '@angular/core';
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
export class RouteSelectComponent {

  public routes: any;
  private routeSub: Subscription;

  constructor(
    private routeService: RouteService,
    public router: Router
  ) {
    this.routes = this.routeService.getRouteArray();
  }

}
