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


}
