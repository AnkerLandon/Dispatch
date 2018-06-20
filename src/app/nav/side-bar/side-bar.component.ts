import { Component, OnInit, HostListener } from '@angular/core';
import { NavService } from '../nav.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-side-bar',
  template: `
  <app-header></app-header>

  <mat-sidenav-container class="example-container" >
      <mat-sidenav #sidenav [(opened)]="status" mode="side">
        test
    </mat-sidenav>
    <mat-sidenav-content>
    <main >
        <body>
            <div >
              <router-outlet></router-outlet>
            </div>
        </body>
      </main>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: [`
    .side{
      width: 100%;
      min-width: 200px;
      float: right;
      padding-bottom: 1rem;
      padding-right: 1rem;
      margin: auto;
    }

  `],
})
export class SideBarComponent implements OnInit {
  statusSub: Subscription;
  sizeSub: Subscription;
  status = false;
  size: string;

  constructor(
    public navService: NavService) {}

   ngOnInit() {
      this.statusSub = this.navService.get()
        .subscribe((record: any) => {
        this.status = record;
    });
    this.sizeSub = this.navService.onResize$
    .subscribe((newsize: any) => {
      this.size = newsize.outerWidth;
      if (Number(this.size) >= 1300 && this.status === false) {
        this.status = true;
      } else if (Number(this.size) <= 1300 && this.status === true) {
        this.status = false;
      }
    });
    }



}
