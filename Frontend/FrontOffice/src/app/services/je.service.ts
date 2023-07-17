import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Je } from '../models/Je';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class JeService {

  private openServerUrl = environment.openApiUrl;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getAllJe():Observable<Je[]>{
    //console.log("in service je");
    return this.http.get<Je[]>(`${this.openServerUrl}/je/getAllJe`);
  }

  public getJeByUser(user:User):Observable<Je>{
    return this.http.get<Je>(`${this.apiServerUrl}/je/getJeByUser/`+user.email);
  }
}
