import { Injectable } from '@angular/core';
import { User } from '../models/user-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HeaderComponent } from '../nav/header/header.component';
import { NotificationService } from '../nav/notification/snack.service';


@Injectable({ providedIn: 'root'})
export class AuthService {
  private tokenTimer: any;
  private token: string;
  private authentication: {
    status: boolean,
    rank: string,
    userName: string } = {status: false, rank: null, userName: null};
  private authStatusListener = new Subject<{status: boolean, rank: string, userName: string}>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private notifyService: NotificationService ) {}

  getToken() {
    return this.token;
  }

  loginUser(authData) {
    this.http.post('http://localhost:3000/api/user/login', authData)
    .subscribe((response: any) => {
      if (response.token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);

        this.token = response.token;
        this.authentication = {status: true, rank: response.rank, userName: response.userName};
        this.authStatusListener.next(this.authentication);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate, response.rank, response.userName);
        console.log('log', this.authentication.rank);
        if (this.authentication.rank === 'Dispatch') {
          this.router.navigate(['/customers']);
        } else {
          this.router.navigate(['/driver']);
        }
      }
    }, (err) => {this.notifyService.notify(err.error.message); });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const exiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (exiresIn > 0) {
      this.token = authInformation.token;
      this.authentication = {status: true, rank: authInformation.rank, userName: authInformation.userName};
      this.setAuthTimer( exiresIn / 1000);
      this.authStatusListener.next(this.authentication);
    }
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getAuth() {
    return this.authentication;
  }

  logOut() {
    this.token = null;
    this.authentication = {status: false, rank: null, userName: null};
    this.authStatusListener.next(this.authentication);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(tokenDuration: number) {
    this.tokenTimer = setTimeout(() => { this.logOut(); }, tokenDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, rank: string, userName: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('rank', rank);
    localStorage.setItem('userName', userName);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('rank');
    localStorage.removeItem('userName');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const rank = localStorage.getItem('rank');
    const userName = localStorage.getItem('userName');
    if (!token || !expirationDate) {
      console.log('error in getAuthData');
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      rank: rank,
      userName: userName
    };
  }
}
