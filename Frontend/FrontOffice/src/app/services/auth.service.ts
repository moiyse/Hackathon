import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { TokenStorageService } from './token-storage.service';




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private openServiceUrl = environment.openApiUrl;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private router:Router,private tokenStorage:TokenStorageService,private http: HttpClient) { }

  login(credentials : any): Observable<any> {
    //console.log("credentials email : "+credentials.email+"credentials email : "+credentials.password)
    return this.http.post(this.openServiceUrl + '/signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  register(user : User): Observable<any> {
    return this.http.post(this.openServiceUrl  + '/signup', {
      nom: user.nom,
      prenom: user.prenom,
      cin: user.cin,
      email: user.email,
      password: user.password,
      etablissement: user.etablissement,
      idJe: user.je.idJe,
      imagePath: user.imagePath,
      domain:window.location.origin,
    }, httpOptions);
  }

  checkToken():Observable<any>{
    //console.log("in check token")
    return this.http.get(this.apiServerUrl  + '/checkToken',{responseType: 'text'});
    
  }

  verifyEmailVerfication(code:String):Observable<any>{
    return this.http.get<any>(this.openServiceUrl  + '/verify/'+code);
  }

  sendEmailVerification(user:User):Observable<any>{
    let body = {user:user,domain:window.location.origin}
    return this.http.post<any>(this.openServiceUrl  + '/sendVerificationLink/',body);
  }

  processForgotPassword(email:String):Observable<any>{
    let url = window.location.origin
    let body = {domain : url}
    return this.http.post<any>(this.openServiceUrl  + '/forgot_password/'+email,body);
    
  }

  processResetPassword(token:String,password:String):Observable<any>{
    let body = {token : token,password:password}
    console.log("body : ",body)
    return this.http.post<any>(this.openServiceUrl  + '/reset_password/',body);
    
  }

  getEmailFromToken():any{
    //console.log("in get emial from token")
    let jwt = this.tokenStorage.getToken()
    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    return decodedJwtData.sub
  }

  chechAuth(){
    //("in check auth")
    //console.log("storage user : ",this.tokenStorage.getUser()," user of token : ",this.getEmailFromToken())
    if(this.tokenStorage.getUser() != this.getEmailFromToken())
    {
      this.tokenStorage.signOut();
    }
    else{
      this.checkToken().subscribe(data => {console.log(data)},err=>{console.log(err.message),this.tokenStorage.signOut()})
      //console.log("auth valid !")
    }
  }



}

