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

  constructor(private invitationService:InvitationService,private equipeService:EquipeService, private userService:UserService, private tokenStorage:TokenStorageService) { }
  
  invitationsReceived!:Invitation[];
  user!:User;
  equipe!: Equipe;
  leader!: Boolean;
  equipeExists!: Boolean;
  thirdCondition!: Boolean;
  invitationNumber:number = 0;
  invitationsSent:Invitation[] =[];
  receivers:User[] = [];

  ngOnInit() {
    console.log("equipe exists : ",this.equipeExists)
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        console.log("fil invitation : ",data)
        this.user = data
        this.equipeService.getEquipeByUser(this.user).subscribe(async (data) => {
          this.equipe = data;
          console.log("equiupe retrieved",data)
          this.invitationService.getInvitationReceived(this.user).subscribe(data => {this.invitationNumber=data.length;console.log("number of invitations is : ",this.invitationNumber)},err => console.log("error in number of invitations",err));
          this.invitationService.getInvitationSent(this.user).subscribe(data => {
            data.forEach(invitation => {
              console.log("invite : ",invitation)
              if(invitation.status == "OPENED" || invitation.status == "PENDING")
              {
                this.invitationsSent.push(invitation)
                console.log("here and invitationsSent became : ",this.invitationsSent)
                this.userService.getReceiverOfInvitation(invitation.idInvitation).subscribe(data => {
                this.receivers.push(data);
                console.log("receiver retreived : ",data)
              })
              }
            });
          },err => {console.log(err)})
          this.equipeService.getEquipeByLeader(this.user).subscribe(data => {
            
            console.log("team leader data : ",data)
            this.leader = data
            if(this.leader==true)
            this.equipeExists=true
            else if(this.equipe !=null && this.leader==false)
            this.equipeExists=true
            else if(this.equipe ==null && this.leader==false)
            {
              this.thirdCondition=true;

            }
            
          },err=> {console.log("error in the invitation sent of leader of team probably leader not found : ",err)})
          

        })
        

      },err=> {console.log("error in the invitation sent of getting user details : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")
  }

  reload(){
    this.invitationService.getInvitationSent(this.user).subscribe(data => {
      data.forEach(invitation => {
        console.log("invite : ",invitation)
        if(invitation.status == "OPENED" || invitation.status == "PENDING")
        {
          this.invitationsSent.push(invitation)
          console.log("here and invitationsSent became : ",this.invitationsSent)
          this.userService.getReceiverOfInvitation(invitation.idInvitation).subscribe(data => {
          this.receivers.push(data);
          console.log("receiver retreived : ",data)
        })
        }
      });
    },err => {console.log(err)})
  }



  withdrawInvitation(idInvitation:number){
    this.invitationService.changeInvitationStatus(this.user,idInvitation,"withdrawn").subscribe(data => {this.reload()},err => console.log(err))
  }




}
