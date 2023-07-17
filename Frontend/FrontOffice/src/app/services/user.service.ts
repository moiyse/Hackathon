import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipe } from '../models/Equipe';
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

  getReceiverOfInvitation(id_invitation:number):Observable<User>{
    return this.http.get<User>(this.apiServerUrl  + '/user/getReceiverOfInvitation/'+id_invitation);
  }

  getMembersOfEquipe(idEquipe:number):Observable<User[]>{
    return this.http.get<User[]>(this.apiServerUrl  + '/user/getMembersOfEquipe/'+idEquipe);
  }

  getLeaderOfEquipe(idEquipe:number):Observable<User>{
    return this.http.get<User>(this.apiServerUrl  + '/user/getLeaderOfEquipe/'+idEquipe);
  }

  leaveTeam(user:User):Observable<Boolean>{
    return this.http.put<Boolean>(this.apiServerUrl  + '/user/leaveTeam',user);
  }

  checkSateOfUser(user:User,idEquipe:number):Observable<any>{
    return this.http.post<any>(this.apiServerUrl  + '/user/checkSateOfUser/'+idEquipe,user);
  }

  updateUserProfile(user:User):Observable<any>{
    return this.http.put<any>(this.apiServerUrl+'/user/Update',user);
  }
  

  
}
