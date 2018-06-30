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
    this.http.get<{documents}>('http://localhost:3000/api/user')
      .pipe(map((userData) => {
        return userData.documents.map(user => {
          return {
            _id: user._id,
            email:  user.email,
            password:  user.password,
            firstName:  user.firstName,
            lastName:  user.lastName,
            address:  user.address,
            city:  user.city,
            state:  user.state,
            zip:  user.zip,
            phone: user.phone,
            rank: user.rank
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

  addUser(newUser: User) {
    this.http.post
      ('http://localhost:3000/api/user/new', newUser)
      .subscribe((responceData: any) => {
        console.log(responceData.message);
        const myUser_id = responceData.id ;
        newUser._id = myUser_id;
        this.users.push(newUser);
        this.userUpdate.next([...this.users]);
      });

  }

  editUser(userId: string, editedUserData: User) {
    console.log('userData', editedUserData);
    this.http.put('http://localhost:3000/api/user/' + userId, editedUserData)
      .subscribe((response) => {
        console.log(response);
        this.getUsers();

      });
  }

  deleteUser(userId: string) {
    this.http.delete('http://localhost:3000/api/user/' + userId)
      .subscribe((response) => {
      this.getUsers();
      });
  }




}
