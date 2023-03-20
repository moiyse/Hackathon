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
import { ModalInvitationComponent } from './modal-invitation/modal-invitation.component';

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

  constructor(private dialog: MatDialog,private authService:AuthService,private router:Router,private equipeService:EquipeService,private userService:UserService,private tokenStorage:TokenStorageService,private invitationService:InvitationService) { }

  ngOnInit(): void {
    console.log("equipe exists : ",this.equipeExists)
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {
        console.log("fil invitation : ",data)
        this.user = data
        this.equipeService.getEquipeByUser(this.user).subscribe(async (data) => {
          this.equipe = data;
          console.log("equiupe retrieved",this.equipe)
          await this.equipeService.getEquipeByLeader(this.user).subscribe(data => {
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
            
          },err=> {console.log("error in the invitation sent of leader of team probably leader not found : ",err)})
          

        })
        

      },err=> {console.log("error in the invitation sent of getting user details : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")

  }


  openDialogInvitation(): void {
    const dialogRef = this.dialog.open(ModalInvitationComponent, {
      width: '700px',
      data: {user: this.user}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  openDialogTeamCreation(){
    
  }

}
