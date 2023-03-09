import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { User } from '../Models/User';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(){
    return this.http.get<User[]>(environment.endpoints.Users.GetAll)
  }

  getUser(id: number) {
    return this.http.get<User>(environment.endpoints.Users.get + id);
  }

  deleteAdmin(id:number){
    return this.http.delete<any>(environment.endpoints.Users.delete+id);
  }

  addAdmin(admin:User){
    return this.http.post<User>(environment.endpoints.Users.post, admin);
  }

  updateAdmin(admin:User){
    return this.http.put<User>(environment.endpoints.Users.update, admin);
  }

}
