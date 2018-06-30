import { Injectable } from '@angular/core';
import { User } from '../models/user-data.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({ providedIn: 'root'})
export class AuthService {
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
        this.token = response.token;
        this.authentication = {status: true, rank: response.rank};
        this.authStatusListener.next(this.authentication);
        this.router.navigate(['/customers']);
      }
    });
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
    this.router.navigate(['/']);
  }
}
