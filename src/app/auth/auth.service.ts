import { Injectable } from '@angular/core';
import { User } from '../models/user-data.model';
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient ) {}

  createUser(userData: User) {

  }
}
