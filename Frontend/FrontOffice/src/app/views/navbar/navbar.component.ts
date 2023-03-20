import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Equipe } from 'src/app/models/Equipe';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { InvitationService } from 'src/app/services/invitation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  email?;
  token?;
  user = new User();
  invitationNumber:number = 0;
  equipeExists:Boolean = false;
  equipe!:Equipe;
  constructor(private authService:AuthService,private router:Router,private equipeService:EquipeService,private userService:UserService,private tokenStorage:TokenStorageService,private invitationService:InvitationService) { 
    this.token = this.tokenStorage.getToken();
    this.email = this.tokenStorage.getUser();
    
  }
  

  ngOnInit(): void {
    if(this.tokenStorage.getUser()){
      this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => {
        console.log("getuserbyemail = "+data);this.user = data
        this.invitationService.getInvitationReceived(this.user).subscribe(data => {this.invitationNumber=data.length;console.log("number of invitations is : ",this.invitationNumber)},err => console.log("error in number of invitations",err));
        this.equipeService.getEquipeByUser(this.user).subscribe(data => {
          this.equipe = data;
          if(this.equipe !=null)
            this.equipeExists=true
        })
        
      },err=> {console.log("error on getUserByEmail in navbar is : ",err);this.tokenStorage.signOut()})
      
    }
  }

  

  logout(){
    
    this.tokenStorage.logout();
  }

  

}
