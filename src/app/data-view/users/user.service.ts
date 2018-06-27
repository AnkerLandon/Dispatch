import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../../models/user-data.model';


@Injectable({providedIn: 'root'})
export class UserService {
  private users: User[] = [];
  private userUpdate = new Subject<User[]>();


  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<{documents}>('http://localhost:3000/api/users')
      .pipe(map((userData) => {
        return userData.documents.map(user => {
          return {
            _id: user._id,
            email:  user.email,
            password:  user.password,
            firstName:  user.firstName,
            LastName:  user.LastName,
            address:  user.address,
            city:  user.city,
            state:  user.state,
            zip:  user.zip,
            phone: user.phone
          };
        });
      }))
      .subscribe(mappedUsers => {
        this.users = mappedUsers;
        this.userUpdate.next([...this.users]);
      });
  }

  getUsersUpdateListener() {
    return this.userUpdate.asObservable();
  }




}
