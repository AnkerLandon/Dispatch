import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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

  constructor(public authService: AuthService) {}
  isLoading = false;

  onLogin(loginData: NgForm) {
    console.log('auth', loginData.value);
    this.authService.loginUser(loginData.value);
  }
}
