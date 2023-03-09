import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs-compat';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(email:string, password:string):Observable<any>{
    return this.http.get<any>(environment.endpoints.Users.login+"?email="+email+"&password="+password);
  }

  isLoggedIn():boolean{
    return localStorage.getItem("admin_token")? true:false;
  }

  logOut(){
      // localStorage.removeItem("CONNECTED_ADMIN");
      localStorage.removeItem("admin_token");
  }
}
