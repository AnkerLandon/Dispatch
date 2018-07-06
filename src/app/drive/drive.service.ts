import { Injectable } from '@angular/core';
import { RouteService } from '../dispatch/route/route.service';

@Injectable ({providedIn: 'root'})
export class DriveService {

  constructor(private routeService: RouteService) {
    // this.routeService.getRoutes();
  }

}
