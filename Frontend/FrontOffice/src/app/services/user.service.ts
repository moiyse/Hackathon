import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http:HttpClient) { }

  getUserByEmail(email:String):Observable<any>{
    return this.http.get(this.apiServerUrl  + '/getUserByEmail/'+email);
  }
}
