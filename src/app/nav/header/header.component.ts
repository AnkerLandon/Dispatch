import {Component, OnInit, OnDestroy} from '@angular/core';
import { NavService } from '../nav.service';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';
import {Location} from '@angular/common';

@Component({
  selector: 'app-header',
  template: `
  <div id="header" >
    <mat-toolbar color="primary" class="example-toolbar">
      <button
          mat-icon-button class="topnav"
          (click)="backClicked()"
          fxHide.gt-md
         >
        <mat-icon>arrow_back_ios</mat-icon>
      </button>
      <div fxHide.lt-md opened="false" ></div>
      <h1 class="Dispatch">Dispatch App</h1>
      <span class="spacer"></span>
      <span>
        <ul *ngIf="userAuthentication.status">
          <li>
            <h3>{{userAuthentication.userName}} ({{userAuthentication.rank}})</h3>
          </li>
          <li>
            <button mat-button (click) ="onLogOut()">Sign Out</button>
          </li>
        </ul>
      </span>
    </mat-toolbar>
</div>
`,
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy {

  userAuthentication: {
    status: boolean,
    rank: string,
    userName: string } = {status: false, rank: null, userName: null};
  opened: boolean;
  private AuthListenerSubs: Subscription;

  constructor(
    private navService: NavService,
    private location: Location,
    private authService: AuthService) {}

  ngOnInit() {
    this.userAuthentication = this.authService.getAuth();
    this.AuthListenerSubs = this.authService.getAuthStatusListener()
    .subscribe(isAuth => {
      this.userAuthentication = isAuth;
    });
  }

  ngOnDestroy() {
    this.AuthListenerSubs.unsubscribe();
  }

  myToggle() {
    if (this.opened) {
      this.opened = false;

    } else {
      this.opened = true;
    }
    this.navService.set(this.opened);
    this.navService.getSize();
  }

  onLogOut() {
    this.authService.logOut();
  }

  backClicked() {
    this.location.back();
}


}
