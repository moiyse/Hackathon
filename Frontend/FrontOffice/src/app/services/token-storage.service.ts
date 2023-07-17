import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
import { User } from '../models/User';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'user-email';
const USER_Name = 'user-name';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor(private router : Router) { }

  signOut(): void{
    window.sessionStorage.clear();
    this.router.navigateByUrl('/landing');
    //console.log("token not valid !")
  }

  async logout(){
    this.router.navigateByUrl('/auth');
    await window.sessionStorage.clear();
  }

  

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    
    return sessionStorage.getItem(TOKEN_KEY)!;
  }

  public saveUser(email: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, email);
  }

  public saveUserName(name: any): void {
    window.sessionStorage.removeItem(USER_Name);
    window.sessionStorage.setItem(USER_Name, name);
  }

  public getUser(): any {
    return sessionStorage.getItem(USER_KEY)!;
  }
  public getUserName(): any {
    return sessionStorage.getItem(USER_Name)!;
  }
}
