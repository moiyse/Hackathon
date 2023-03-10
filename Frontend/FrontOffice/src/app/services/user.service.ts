import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient,private tokenStorage:TokenStorageService) { }

  getUserByEmail(email:String):Observable<User>{
    return this.http.get<User>(this.apiServerUrl  + '/getUserByEmail/'+email);
  }

  affectUserToTeamOnInvivationAcceptation(user:User,id_equipe:number){
    return this.http.put(this.apiServerUrl  + '/user/affectUserToTeamOnInvivationAcceptation/'+id_equipe,user);
  }

  
}
