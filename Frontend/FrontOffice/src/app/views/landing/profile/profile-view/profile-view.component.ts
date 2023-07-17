import { Component, OnInit } from '@angular/core';
import { Equipe } from 'src/app/models/Equipe';
import { Je } from 'src/app/models/Je';
import { User } from 'src/app/models/User';
import { EquipeService } from 'src/app/services/equipe.service';
import { JeService } from 'src/app/services/je.service';
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
  teamToShow="";
  jeToShow=""
  je!:Je;



  constructor(private jeService:JeService,private equipeService:EquipeService,private userService:UserService,private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    this.userService.getUserByEmail(this.tokenStorage.getUser()).subscribe(data => 
      {

        console.log("fil invitation : ",data)
        this.user = data;
        this.getEquipe(this.user)
        this.getJeOfUser(this.user)

      },err=> {console.log("error in the invitation sent of getting user details : ",err);this.tokenStorage.signOut()})
      console.log("refreshed")
  }


  getEquipe(user:User){
    this.equipeService.getEquipeByUser(user).subscribe(async (data) => {
      console.log("equipe retrieved : ",data)
      this.equipe = data;
      if(this.equipe == null)
      {
        console.log("here")
        this.teamToShow = "None"
      }
      else {
        console.log("here1")
        this.teamToShow = this.teamToShow+this.equipe.nom;
      }
      
    })
  }

  getJeOfUser(user:User){
    this.jeService.getJeByUser(user).subscribe(data => {
      this.je = data;
      if(this.je == null)
      {
        console.log("here")
        this.jeToShow = "None"
      }
      else {
        console.log("here1")
        this.jeToShow = this.jeToShow+this.je.nom;
      }
    })
  }





}
