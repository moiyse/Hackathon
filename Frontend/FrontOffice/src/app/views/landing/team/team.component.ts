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
  allEquipes!:Equipe[];
  //controls for changing team name
  equipeNameExist = false;
  showEquipeNameAlert = false;
  alertMessageEquipeName ="";
  alertDanger = false;
  alertWarning = false;
  alertInfo = false;
  alertSecondary = false;
  //////

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

  kickMember(member:User){
    this.userService.leaveTeam(member).subscribe(data => {console.log(data),this.reloadData()},err => {this.reloadData()})
  }

  updateEquipeNom(event) {
    event.preventDefault();
    console.log("team name : ",event.target.textContent)
    const editedText = event.target.textContent.trim();
    if (editedText === '' || editedText === '\u00A0') {
      console.log("here")
      event.target.textContent = this.equipe.nom;
    }
    else{
      this.changeTeamName(editedText)
    }

  }

  mouseClickAlert(event){
    const editedText = event.target.textContent.trim();
    if (editedText === '' || editedText === '\u00A0') {
      console.log("here")
      event.target.textContent = this.equipe.nom;
    }
    else if(this.alertDanger == false && this.alertWarning == false && this.alertInfo == false){
      this.showEquipeNameAlert = true;
      this.alertMessageEquipeName ="you need to press ENTER to change your team's name";
      this.alertDanger = false;
      this.alertWarning = false;
      this.alertInfo = false;
      this.alertSecondary = true;
    }
  }


  changeTeamName(newTeamName:String){
    ///// initialisation ///
    this.equipeNameExist = false
    this.showEquipeNameAlert = false
    this.alertDanger = false;
    this.alertWarning = false;
    this.alertInfo = false;
    this.alertSecondary = false;
    //////////////////////////
    this.equipeService.getAllEquipes().subscribe(data => {
      this.allEquipes = data
      console.log("all Equipes : ",this.allEquipes)
      let equipeNumber = this.allEquipes.length
        console.log("checking for name doubling")
        if(this.allEquipes.length == 0)
        {
          console.log("equipe to save : ",this.equipe)
          this.equipeService.changeTeamName(this.equipe,newTeamName).subscribe(data => {
            console.log(data)
            this.showEquipeNameAlert = true;
            this.alertMessageEquipeName ="Your team name has been successfuly changed";
            this.alertDanger = false;
            this.alertWarning = false;
            this.alertInfo = true;
            this.alertSecondary = false;
          },err=>{
            console.log(err)
            if(err.status == 500){
              this.showEquipeNameAlert = true;
              this.alertMessageEquipeName ="You cannot change the name of your team anymore";
              this.alertDanger = true;
              this.alertWarning = false;
              this.alertInfo = false;
              this.alertSecondary = false;
            }
          })
        }
        else {
          this.allEquipes.forEach(equipe => {
            console.log("equipe number : ",equipeNumber)
            equipeNumber--;
            console.log("equipe.nom : ",equipe.nom," newteamname : ",newTeamName)
            if(equipe.nom == newTeamName)
            {
              this.equipeNameExist = true
              this.showEquipeNameAlert = true;
              this.alertMessageEquipeName ="The name you have chosen already exists";
              this.alertDanger = false;
              this.alertWarning = true;
              this.alertInfo = false;
              this.alertSecondary = false;
            }
            else if(this.equipeNameExist != true){
              this.equipeNameExist = false;
            }
            if(this.equipeNameExist != true && equipeNumber <=0 ){
              this.equipeService.changeTeamName(this.equipe,newTeamName).subscribe(data => {
                console.log(data)
                this.showEquipeNameAlert = true;
                this.alertMessageEquipeName ="Your team's name has been successfuly changed";
                this.alertDanger = false;
                this.alertWarning = false;
                this.alertInfo = true;
                this.alertSecondary = false;
              },err=>{
                console.log(err)
                if(err.status == 500){
                  this.showEquipeNameAlert = true;
                  this.alertMessageEquipeName ="You cannot change the name of your team anymore";
                  this.alertDanger = true;
                  this.alertWarning = false;
                  this.alertInfo = false;
                  this.alertSecondary = false;
                }
              })
            }
          })
        }
    })
  }



}
