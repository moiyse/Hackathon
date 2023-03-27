import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/models/User';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(private userService:UserService,private tokenStorage:TokenStorageService) { }

  user!: User;
  private messageSource = new Subject<string>();
  message$ = this.messageSource.asObservable();


  getUser(): User{
    
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        console.log("data from global service is : in the service it self : ",data)
        return data;

      },err=> {console.log("error in the global service of getting user details : ",err);this.tokenStorage.signOut()})
      return this.user;
      console.log("refreshed")
  }

  sendMessage(message: string) {
    this.messageSource.next(message);
  }


}
