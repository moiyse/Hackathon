import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Invitation } from 'src/app/models/Invitation';
import { User } from 'src/app/models/User';
import { InvitationService } from 'src/app/services/invitation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-invitations-received',
  templateUrl: './invitations-received.component.html',
  styleUrls: ['./invitations-received.component.css']
}) 
export class InvitationsReceivedComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router:Router,private location:Location,private invitationService:InvitationService, private userService:UserService, private tokenStorage:TokenStorageService) { }
  
  
  invitationsReceived!:Invitation[]
  elements : Boolean[] = []
  invitationSelected!: Invitation
  user!: User;

  ngOnInit(): void {

    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        this.user=data;
        this.invitationService.getInvitationReceived(data).subscribe(data => {console.log("data of the service : ",data);this.invitationsReceived=data;console.log("invitation recieved content list",this.invitationsReceived);this.elements = new Array(this.invitationsReceived.length).fill(false);});
      },err=> {console.log("error on invitation is : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")
  }

  /*ngDoCheck(): void {
    console.log("length of tlist of invitations received",this.invitationsReceived.length)
    console.log("ngDoCheck declenche")
    console.log("before ng do check declenche the elements is : ",this.elements);
    if(this.elements.length = 0){
    this.elements = new Array(this.invitationsReceived.length).fill(false);
    console.log("after ng do check declenche the elements is : ",this.elements);
    }
    console.log("after ng do check if condition the elements is : ",this.elements);
  }*/

  


  toggleDetails(index:number){
    this.elements = new Array(this.invitationsReceived.length).fill(false);
    console.log("toggle detail");
    this.elements[index] = !this.elements[index];
    this.invitationSelected = this.invitationsReceived[index];

  }

  accepterInviation(id_equipe:number){
    console.log("id_equipe",id_equipe);
    console.log("id_equipe",this.user);
    this.userService.affectUserToTeamOnInvivationAcceptation(this.user,id_equipe).subscribe(data => {console.log("invitation Accepted ",data)},err => console.log(err))
    this.reloadData();
    this.router.navigateByUrl("/landing/team")
  }

  refuserInvitation(id_invitation:number){
    this.invitationService.refuserInvitation(id_invitation).subscribe(data => {},err => console.log(err))
    this.reloadData();
  }

  reloadData() {
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        this.user=data;
        this.invitationService.getInvitationReceived(data).subscribe(data => {console.log("data of the service : ",data);this.invitationsReceived=data;console.log("invitation recieved content list",this.invitationsReceived);this.elements = new Array(this.invitationsReceived.length).fill(false);});
      },err=> {console.log("error on invitation is : ",err);this.tokenStorage.signOut()})
  }


}
