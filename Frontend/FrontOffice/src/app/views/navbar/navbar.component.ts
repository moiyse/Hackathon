import { Component, DoCheck, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
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
  user :User=new User();
  invitationNumber:number = 0;
  equipeExists:Boolean = false;
  constructor(private userService:UserService,private tokenStorage:TokenStorageService,private invitationService:InvitationService) { 
    this.token = this.tokenStorage.getToken();
    this.email = this.tokenStorage.getUser()
  }

  ngOnInit(): void {
    if(this.tokenStorage.getUser()){
      this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => {
        console.log("getuserbyemail = "+data);
        this.user = data;
        // this.invitationService.getInvitationReceived(this.user).subscribe(data => {this.invitationNumber=data.length;console.log("number of invitations is : ",this.invitationNumber)},err => console.log("error in number of invitations",err));
        // if(this.user.equipe){
        //   this.equipeExists = true;
        // }
        // console.log(data);
      },
      err=> {console.log("error on getUserByEmail in navbar is : ",err)})
      // ;this.tokenStorage.signOut()
    }
    console.log("navbar has reloaded")
  }

  

  logout(){
    this.tokenStorage.signOut();
  }

}
