import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { User } from '../../models/user-data.model';
import { environment } from '../../../environments/environment';

const BACKEND_URL = environment.apiUrl + '/user';


@Injectable({providedIn: 'root'})
export class UserService {

  private users: User[] = [];
  private userUpdate = new Subject<User[]>();

  constructor(private http: HttpClient) {}

  getUsers() {
    this.http.get<{documents}>(BACKEND_URL)
      .pipe(map((userData) => {
        return userData.documents.map(user => {
          return {
            _id: user._id,
            userName:  user.userName,
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
      (BACKEND_URL + '/new', newUser)
      .subscribe((responceData: any) => {
        const myUser_id = responceData.id ;
        newUser._id = myUser_id;
        this.users.push(newUser);
        this.userUpdate.next([...this.users]);
      });

  }

  editUser(userId: string, editedUserData: User) {
    this.http.put(BACKEND_URL + '/' + userId, editedUserData)
      .subscribe((response) => {
        this.getUsers();

      });
  }

  deleteUser(userId: string) {
    this.http.delete(BACKEND_URL + '/' + userId)
      .subscribe((response) => {
      this.getUsers();
      });
  }

}
