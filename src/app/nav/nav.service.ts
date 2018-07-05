import { Subject, Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { DCCustomerComponent } from '../dispatch/customers/DC-Customer.component';
import { MatDialog } from '@angular/material';


@Injectable({
  providedIn: 'root'
})

export class NavService  {
  private navUpdate = new Subject<boolean>();
  public innerWidth: any;
  private theStatus = false;
  private resizeSubject: Subject<Window>;

  constructor(private eventManager: EventManager, public dialog: MatDialog) {
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

  openCustomerDialog(form: any): void {
    const dialogRef = this.dialog.open(DCCustomerComponent, {
      maxWidth: '50vw',
      data:  form
    });
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


