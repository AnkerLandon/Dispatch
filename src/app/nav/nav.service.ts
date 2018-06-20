import { Subject, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})

export class NavService  {
  private navUpdate = new Subject<boolean>();
  public innerWidth: any;
  private theStatus = false;
  private resizeSubject: Subject<Window>;

  constructor(private eventManager: EventManager) {
        this.resizeSubject = new Subject();
        this.eventManager.addGlobalEventListener('window', 'resize', this.onResize.bind(this));
      }

  set(status) {
    this.theStatus = status;
    this.navUpdate.next(this.theStatus);
    console.log(status);
  }

  get() {
    return this.navUpdate.asObservable();
  }

  getSize() {
      this.innerWidth = window.innerWidth;
      console.log(this.innerWidth);
  }

  get onResize$(): Observable<Window> {
      return this.resizeSubject.asObservable();
    }

  private onResize(event: UIEvent) {
      this.resizeSubject.next(<Window>event.target);
    }
  }

}
