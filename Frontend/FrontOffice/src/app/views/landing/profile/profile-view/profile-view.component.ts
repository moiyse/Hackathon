import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/models/Equipe';
import { User } from 'src/app/models/User';
import { EquipeService } from 'src/app/services/equipe.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {

  user!:User;
  equipe!: Equipe;
  leader!: Boolean;
  equipeExists!: Boolean;
  NoEquipeNotLeader!: Boolean;
  animal!: string;
  name!: string;
  teamMembers!:User[];
  leaderOfEquipe!:User;



  constructor(private equipeService:EquipeService,private userService:UserService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {

        console.log("fil invitation : ",data)
        this.user = data;
        if(this.user.cin.length == 7)
        {
          console.log("length : ",this.user.cin.length)
        }
        this.user.cin = "0"+this.user.cin

      },err=> {console.log("error in the invitation sent of getting user details : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")
  }


  getEquipe(user:User){
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



}
