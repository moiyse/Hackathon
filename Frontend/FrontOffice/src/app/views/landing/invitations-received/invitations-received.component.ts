import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
import { Invitation } from 'src/app/models/Invitation';
import { User } from 'src/app/models/User';
import { InvitationService } from 'src/app/services/invitation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { GlobalService } from 'src/app/services/commun/global.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { Equipe } from 'src/app/models/Equipe';

@Component({
  selector: 'app-invitations-received',
  templateUrl: './invitations-received.component.html',
  styleUrls: ['./invitations-received.component.css']
}) 
export class InvitationsReceivedComponent implements OnInit {

  constructor(private equipeService:EquipeService,private globalService:GlobalService,private route: ActivatedRoute,private router:Router,private location:Location,private invitationService:InvitationService, private userService:UserService, private tokenStorage:TokenStorageService) { }
  
  
  invitationsReceived!:Invitation[]
  elements : Boolean[] = []
  invitationSelected!: Invitation
  user!: User;
  invitationNumber:number = 0;
  equipe!:Equipe
  userHaveEquipe = false;


  ngOnInit(): void {

    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        this.user=data;
        this.invitationService.getInvitationReceived(this.user).subscribe(data => {this.invitationNumber=data.length;console.log("number of invitations is : ",this.invitationNumber)},err => console.log("error in number of invitations",err));
        this.invitationService.getInvitationReceived(data).subscribe(data => {console.log("data of the service : ",data);this.invitationsReceived=data;console.log("invitation recieved content list",this.invitationsReceived);this.elements = new Array(this.invitationsReceived.length).fill(false);});
        
      },err=> {console.log("error on invitation is : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")
      

      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd)
      ).subscribe(() => {
        if(this.tokenStorage.getUser())
        {
          this.invitationService.getInvitationReceived(this.user).subscribe(data => {this.invitationNumber=data.length;console.log("number of invitations is : ",this.invitationNumber)},err => console.log("error in number of invitations",err));
          this.refreshNavbarInvitationNumber();
          this.reloadData();
        }
      });
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

  refreshNavbarInvitationNumber() {
    this.globalService.sendMessage('refresh navbar invitation number');
  }


  toggleDetails(index:number){
    this.elements = new Array(this.invitationsReceived.length).fill(false);
    console.log("toggle detail");
    this.elements[index] = !this.elements[index];
    this.invitationSelected = this.invitationsReceived[index];
    console.log("here ")
    console.log("invitationSelected status : ",this.invitationSelected.status)
    if(this.invitationSelected.status == "PENDING")
    {
      console.log("here 1")
      this.invitationService.changeInvitationStatus(this.user,this.invitationSelected.idInvitation,"opened").subscribe(data => console.log("change stuts data : ",data))
    }
  }

  accepterInviation(id_equipe:number,id_invitation:number){
    console.log("id_equipe",id_equipe);
    console.log("id_equipe",this.user);
    this.equipeService.getEquipeByUser(this.user).subscribe(async (data) => {
      this.equipe = data
      if(this.equipe == null)
      {
        this.userService.affectUserToTeamOnInvivationAcceptation(this.user,id_equipe).subscribe(data => {console.log("invitation Accepted ",data);this.router.navigateByUrl("/landing/team")},err => console.log(err))
        this.invitationService.changeInvitationStatus(this.user,id_invitation,"accepted").subscribe(data => {},err => console.log(err))
      }
      else
      this.userHaveEquipe = true
    })
    
    
  }

  refuserInvitation(id_invitation:number){
    this.invitationService.changeInvitationStatus(this.user,id_invitation,"refused").subscribe(data => {this.router.navigateByUrl(`/landing/invitationsReceived?_=${Math.random()}`);;},err => console.log(err))
    
  }

  reloadData() {
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        this.user=data;
        this.invitationService.getInvitationReceived(data).subscribe(data => {console.log("data of the service : ",data);this.invitationsReceived=data;console.log("invitation recieved content list",this.invitationsReceived);this.elements = new Array(this.invitationsReceived.length).fill(false);});
      },err=> {console.log("error on invitation is : ",err);this.tokenStorage.signOut()})
  }


}
