import { Injectable } from '@angular/core';
import { User } from '../models/user-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root'})
export class AuthService {
  private tokenTimer: any;
  private token: string;
  private authentication: {status: boolean, rank: string } = {status: false, rank: null};
  private authStatusListener = new Subject<{status: boolean, rank: string}>();

  constructor(private http: HttpClient, private router: Router ) {}

  getToken() {
    return this.token;
  }

  loginUser(authData) {
    this.http.post('http://localhost:3000/api/user/login', authData)
    .subscribe((response: any) => {
      console.log(response);
      if (response.token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);

        this.token = response.token;
        this.authentication = {status: true, rank: response.rank};
        this.authStatusListener.next(this.authentication);

        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate, response.rank);

        this.router.navigate(['/customers']);
      }
    });
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
      this.authentication = {status: true, rank: authInformation.rank};
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
    this.authentication = {status: false, rank: null};
    this.authStatusListener.next(this.authentication);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
  }

  private setAuthTimer(tokenDuration: number) {
    this.tokenTimer = setTimeout(() => { this.logOut(); }, tokenDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, rank: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('rank', rank);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('rank');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const rank = localStorage.getItem('rank');
    if (!token || !expirationDate) {
      console.log('error in getAuthData');
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      rank: rank
    };
  }
}
