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

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) { this.getRoutes(); }

  getRoutes() {
    this.http.get<{documents: any[]}>
      ('http://localhost:3000/api/route')
      .pipe(map((routeData) => {
        return routeData.documents.map(route => {
          return {
            _id: route._id,
            title: route.title,
            description: route.description
          };
        });
      }))
      .subscribe(routeResult => {
        this.routes = routeResult;
        console.log('routes get', this.routes);
        this.routeUpdate.next([...this.routes]);
        this.routeArray = this.getRouteArray();
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

  getRouteArray() {
    // this.getRoutes();
    const test = [];
    this.routes.forEach(function (item) {
      test.push(item.title);
    });
    console.log(test);
    this.routeArrayUpdate.next([...test]);
    return test;
  }

  getRouteArrayUpdateListener() {
    return this.routeArrayUpdate.asObservable();
  }

}
