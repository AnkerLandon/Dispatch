import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html',
  styles: [`
    mat-form-field{
      width: 100%;
    }
    #login{
      display: block;
      margin-left: auto;
      margin-right: auto;
      max-width: 600px;
      min-width: 200px;
      float: center;
    }
  `]
})

export class LoginComponent {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
    const isAuth = this.authService.getAuth();
    if (isAuth.status) {
      if (isAuth.rank === 'Dispatch') {
        this.router.navigate(['/customers']);
      } else {this.router.navigate(['/driver']); }
    }
  }
  isLoading = false;

  onLogin(loginData: NgForm) {
    this.authService.loginUser(loginData.value);
  }
}
