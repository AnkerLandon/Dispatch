import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/route';


@Injectable({providedIn: 'root'})
export class RouteService {
  private routes: any[] = [];
  private routeArray: any[] = [];
  private routeUpdate = new Subject<any[]>();
  private routeArrayUpdate = new Subject<any[]>();
  private mapRoutes: any;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { }

  getRoutes(update: boolean) {
    this.http.get<{documents: any[]}>(BACKEND_URL)
      .pipe(map((routeData) => {
        return routeData.documents.map(route => {
          this.mapRoutes = route;
          return this.mapRoutes;
        });
      }))
      .subscribe(routeResult => {
        this.routes = routeResult;
        this.getRouteArrayUpdate();
        if (update) {this.routeUpdate.next([...this.routes]); }
      });
  }

  getRoutesUpdateListener() {
    return this.routeUpdate.asObservable();
  }

  addRoute(routeData: any) {
    this.http.post
      (BACKEND_URL + '/new', routeData)
      .subscribe((responseData: any) => {
        this.getRoutes(true);
      });
  }

  getRouteArrayUpdate() {
    const tempArray = [];
    this.routes.forEach(function (item) {
      tempArray.push(item.title);
    });
    this.routeArray = tempArray;
    this.routeArrayUpdate.next([...this.routeArray]);
  }

  getRouteArray() {
    return this.routeArray;
  }

  getRouteArrayUpdateListener() {
    return this.routeArrayUpdate.asObservable();
  }

  editRoute(editedRoute: any) {
    this.http.put(BACKEND_URL + '/route', editedRoute)
    .subscribe((responce) => {
      this.getRoutes(true);
    });
  }

  deleteRoute(route_id: string) {
    this.http.delete(BACKEND_URL + '/' + route_id)
      .subscribe((response) => {
        this.getRoutes(true);
      });
  }

}
