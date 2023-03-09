import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/models/Equipe';
import { Invitation } from 'src/app/models/Invitation';
import { User } from 'src/app/models/User';
import { GlobalService } from 'src/app/services/commun/global.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { InvitationService } from 'src/app/services/invitation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invitations-sent',
  templateUrl: './invitations-sent.component.html',
  styleUrls: ['./invitations-sent.component.css']
})
export class InvitationsSentComponent implements OnInit {

  constructor(private equipeService:EquipeService, private userService:UserService, private tokenStorage:TokenStorageService) { }
  
  invitationsReceived!:Invitation[]
  user!:User;
  equipe!: Equipe;

  ngOnInit() {
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        console.log("fil invitation : ",data)
        this.user = data
        this.equipeService.getEquipeByLeader(data).subscribe(data => {
          this.equipe = data
        },err=> {console.log("error in the invitation sent of leader of team probably leader not found : ",err)})

      },err=> {console.log("error in the invitation sent of getting user details : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")

      
  }




}
