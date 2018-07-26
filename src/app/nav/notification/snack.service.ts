import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class NotificationService {

  private notifyUpdate = new Subject<string>();
  private message: string;

  constructor() {}

  notify(message: string) {
    console.log('notify:', message);
    this.message = message;
    this.notifyUpdate.next(message);
  }

  notifyUpdateListener() {
    return this.notifyUpdate.asObservable();
  }

  getMessage() {
    return this.message;
  }

}
