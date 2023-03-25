import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EquipeService } from 'src/app/services/equipe.service';
import { InvitationService } from 'src/app/services/invitation.service';
import { UserService } from 'src/app/services/user.service';
import { Equipe } from 'src/app/models/Equipe';
import { Hackathon } from 'src/app/models/Hackathon';
import { HackathonService } from 'src/app/services/hackathon.service';

@Component({
  selector: 'app-modal-team-creating',
  templateUrl: './modal-team-creating.component.html',
  styleUrls: ['./modal-team-creating.component.css']
})
export class ModalTeamCreatingComponent implements OnInit {

  equipeExists = false;
  equipeForm!:FormGroup;
  allEquipes = new Array();
  commingHackathon!:Hackathon;
  equipe = new Equipe();
  equipeNumberMaxed = false;

  constructor(public hackathonService:HackathonService,public equipeService:EquipeService,public invitationService:InvitationService,public userService:UserService,public dialogRef: MatDialogRef<ModalTeamCreatingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {

    this.equipeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
    this.hackathonService.getCommingHackathon().subscribe(data => {
      console.log("active hackthon : ",data)
      this.commingHackathon = data
    })

  }

  saveEquipe(){
    this.equipeService.getAllEquipes().subscribe(data => {
      this.allEquipes = data
      console.log("all Equipes : ",this.allEquipes)
      let equipeNumber = this.allEquipes.length
      if(this.commingHackathon.nbrMaxEquipe <= equipeNumber)
      {
        this.equipeNumberMaxed = true;
      }
      else{
        console.log("checking for name doubling")
        if(this.allEquipes.length == 0)
        {
          this.equipe.nom = this.equipeForm.value.name;
          this.equipe.idHackathon = this.commingHackathon.idHackathon;
          this.equipe.leader = this.data.user;
          this.equipe.members = this.data.user;
          console.log("equipe to save : ",this.equipe)
          this.equipeService.createEquipe(this.data.user,this.equipe.nom,this.commingHackathon.idHackathon).subscribe(data => {console.log("the equipe that has been saved : ",data);this.dialogRef.close();},err=>console.log("createEquipe is generating an error : ",err))
        }
        else {
          this.allEquipes.forEach(equipe => {
            console.log("equipe number : ",equipeNumber)
            equipeNumber--;
            if(equipe.nom == this.equipeForm.value.name)
            {
              this.equipeExists = true;
            }
            else if(this.equipeExists != true && equipeNumber <=0 ){
              console.log("into condition where there is no name doubling")
              this.equipe.nom = this.equipeForm.value.name;
              this.equipe.idHackathon = this.commingHackathon.idHackathon;
              this.equipe.leader = this.data.user;
              this.equipe.members = this.data.user;
              console.log("equipe to save : ",this.equipe)
              this.equipeService.createEquipe(this.data.user,this.equipe.nom,this.commingHackathon.idHackathon).subscribe(data => {console.log("the equipe that has been saved : ",data);this.dialogRef.close();},err=>console.log("createEquipe is generating an error : ",err))
            }
          })

        }
        
      }
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
