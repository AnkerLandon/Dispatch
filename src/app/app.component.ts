import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { NotificationService } from './nav/notification/snack.service';
import { MatSnackBar } from '@angular/material';
import { SnackComponent } from './nav/notification/snack.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  public message: string;
  private messageSub: Subscription;

  constructor(
    private authservice: AuthService,
    public notificationService: NotificationService,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.authservice.autoAuthUser();
    this.messageSub = this.notificationService.notifyUpdateListener()
    .subscribe((message: string) => {
      console.log('the message: ', message);
      this.message = message;
      this.openSnackBar();
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(SnackComponent, {
      duration: 5000,
    });
  }
}
