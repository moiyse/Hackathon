import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
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
  user! :User;
  constructor(private userService:UserService,private tokenStorage:TokenStorageService) { 
    this.token = this.tokenStorage.getToken();
    this.email = this.tokenStorage.getUser()
  }

  ngOnInit(): void {
    if(this.tokenStorage.getUser()){
      this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => {console.log("getuserbyemail = "+data);this.user = data},err=>this.tokenStorage.signOut())
    }
  }

  logout(){
    this.tokenStorage.signOut();
  }

}
