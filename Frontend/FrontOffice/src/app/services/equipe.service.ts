import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipe } from '../models/Equipe';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class EquipeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getEquipeByLeader(user:User):Observable<Boolean>{
    return this.http.post<Boolean>(`${this.apiServerUrl}/equipe/getEquipeByLeader`,user);

  }

  public getEquipeByUser(user:User):Observable<Equipe>{
    return this.http.post<Equipe>(`${this.apiServerUrl}/equipe/getEquipeByUser`,user);
  }

  public getAllEquipes():Observable<Equipe[]>{
    return this.http.get<Equipe[]>(`${this.apiServerUrl}/equipe/Get`);
  }

  public createEquipe(user:User,equipeName:String,idHackathon:number):Observable<Equipe>{
    return this.http.post<Equipe>(`${this.apiServerUrl}/equipe/createEquipeOfHackathon/`+equipeName+"/"+idHackathon,user);
  }

  public deleteEquipeWithRemovingUserKey(idEquipe:number):Observable<Equipe>{
    return this.http.delete<Equipe>(`${this.apiServerUrl}/equipe/deleteEquipeWithRemovingUserKey/`+idEquipe);
  }

  public changeTeamName(equipe:Equipe,equipeName:String):Observable<Equipe>{
    return this.http.put<Equipe>(`${this.apiServerUrl}/equipe/changeTeamName/`+equipeName,equipe);

  }


}
