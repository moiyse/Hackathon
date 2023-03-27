import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipe } from 'src/app/models/Equipe';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { EquipeService } from 'src/app/services/equipe.service';
import { InvitationService } from 'src/app/services/invitation.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalInvitationComponent } from './modals/modal-invitation/modal-invitation.component';
import { ModalTeamCreatingComponent } from './modals/modal-team-creating/modal-team-creating.component';
import { ModalConfirmingLeavingEquipeComponent } from './modals/modal-confirming-leaving-equipe/modal-confirming-leaving-equipe.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  user!:User;
  equipe!: Equipe;
  leader!: Boolean;
  equipeExists!: Boolean;
  NoEquipeNotLeader!: Boolean;
  animal!: string;
  name!: string;
  teamMembers!:User[];
  leaderOfEquipe!:User;

  constructor(private dialog: MatDialog,private authService:AuthService,private router:Router,private equipeService:EquipeService,private userService:UserService,private tokenStorage:TokenStorageService,private invitationService:InvitationService) { }

  ngOnInit(): void {
    console.log("equipe exists : ",this.equipeExists)
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        console.log("fil invitation : ",data)
        this.user = data
        this.setupDisplay(this.user);

      },err=> {console.log("error in the invitation sent of getting user details : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")

  }


  setupDisplay(user:User){
    this.equipeService.getEquipeByUser(user).subscribe(async (data) => {
      console.log("equipe retrieved : ",data)
      this.equipe = data;
      if(this.equipe == null)
      {
        this.NoEquipeNotLeader=true;
      }
      else{
        this.userService.getLeaderOfEquipe(this.equipe.idEquipe).subscribe(data => {this.leaderOfEquipe = data;console.log("leader of equipe retrieved : ",this.leaderOfEquipe)})
        console.log("equiupe retrieved",this.equipe)
        this.userService.checkSateOfUser(user,this.equipe.idEquipe).subscribe(data => {
          console.log("data of the string is : ",data)
          if(data == 0)
          {
            this.leader = true
            this.equipeExists=true
            this.userService.getMembersOfEquipe(this.equipe.idEquipe).subscribe(data => {
              this.teamMembers = data;
            })
          }
          else if(data == 1)
          {
            console.log("here and equipe exists = ",this.equipeExists)
            this.equipeExists=true
            this.userService.getMembersOfEquipe(this.equipe.idEquipe).subscribe(data => {
              this.teamMembers = data;
            })
          }
          else if(data == 2)
          {
            this.NoEquipeNotLeader=true;
          }
          else 
          console.log("ddata from check state user : ",data)
        },err => console.log("error in check user : ",err))
        /*await this.equipeService.getEquipeByLeader(user).subscribe(data => {
          console.log("team leader data : ",data)
          this.leader = data
          if(this.leader==true){
            this.equipeExists=true
            this.userService.getMembersOfEquipe(this.equipe.idEquipe).subscribe(data => {
              this.teamMembers = data;
            })
          }
          else if(this.equipe !=null && this.leader==false){
            console.log("here and equipe exists = ",this.equipeExists)
            this.equipeExists=true
            this.userService.getMembersOfEquipe(this.equipe.idEquipe).subscribe(data => {
              this.teamMembers = data;
            })
          }
          else if(this.equipe ==null && this.leader==false)
          {
            this.NoEquipeNotLeader=true;
          }
          
        },err=> {console.log("error in the invitation sent of leader of team probably leader not found : ",err)})*/
      }
    })
  }


  openDialogInvitation(): void {
    const dialogRef = this.dialog.open(ModalInvitationComponent, {
      width: '700px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogTeamCreation(){
    const dialogRef = this.dialog.open(ModalTeamCreatingComponent, {
      width: '400px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.reloadData()
    });
  }


  exitTeam(){
    const dialogRef = this.dialog.open(ModalConfirmingLeavingEquipeComponent, {
      width: '500px',
      data: {user: this.user,equipe: this.equipe,leader:this.leader}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  reloadData(){
    this.setupDisplay(this.user);
  }

}
