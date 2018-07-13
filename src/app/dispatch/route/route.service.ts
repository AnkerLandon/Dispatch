import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';


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

  getRoutes() {
    this.http.get<{documents: any[]}>
      ('http://localhost:3000/api/route')
      .pipe(map((routeData) => {
        return routeData.documents.map(route => {
          this.mapRoutes = route;
          return this.mapRoutes;
        });
      }))
      .subscribe(routeResult => {
        this.routes = routeResult;
        this.getRouteArrayUpdate();
        console.log('routes get', this.routes);
        this.routeUpdate.next([...this.routes]);
      });
  }

  getRoutesUpdateListener() {
    return this.routeUpdate.asObservable();
  }

  addRoute(routeData: any) {
    this.http.post
      ('http://localhost:3000/api/route/new', routeData)
      .subscribe((responseData: any) => {
        console.log(responseData);
        this.getRoutes();
      });
  }

  getRouteArrayUpdate() {
    const test = [];
    this.routes.forEach(function (item) {
      test.push(item.title);
    });
    this.routeArray = test;
    console.log(this.routeArray);
    this.routeArrayUpdate.next([...this.routeArray]);

  }

  getRouteArray() {
    return this.routeArray;
  }

  getRouteArrayUpdateListener() {
    return this.routeArrayUpdate.asObservable();
  }

  editRoute(editedRoute: any) {
    this.http.put('http://localhost:3000/api/route', editedRoute)
    .subscribe((responce) => {
      console.log('edited route', responce);
      this.getRoutes();
    });
  }

  deleteRoute(route_id: string) {
    this.http.delete('http://localhost:3000/api/route/' + route_id)
      .subscribe((response) => {
      this.getRoutes();
      });
  }

}
