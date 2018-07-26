import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../node_modules/rxjs';
import { NotificationService } from './snack.service';
import { MatSnackBar } from '../../../../node_modules/@angular/material';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-notify-dialog',
  template: `
    <div mat-dialog-content>
      <p class="mat-body-1">
        {{message}}
      </p>
    </div>

  `,
  styles: [`
  .snack {
    font-family: "veranda", sans-serif;
    text-align: center;
    width: 100%;
  }
  `]
})

export class SnackComponent {

  public message: string;
  private messageSub: Subscription;

  constructor (
    public notificationService: NotificationService,
    public snackBar: MatSnackBar) {
      this.message = this.notificationService.getMessage();
    }

}
