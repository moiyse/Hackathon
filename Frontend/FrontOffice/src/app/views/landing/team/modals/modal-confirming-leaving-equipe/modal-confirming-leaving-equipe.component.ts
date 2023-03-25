import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EquipeService } from 'src/app/services/equipe.service';
import { InvitationService } from 'src/app/services/invitation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-modal-confirming-leaving-equipe',
  templateUrl: './modal-confirming-leaving-equipe.component.html',
  styleUrls: ['./modal-confirming-leaving-equipe.component.css']
})
export class ModalConfirmingLeavingEquipeComponent implements OnInit {

  leader!:Boolean
  constructor(public router:Router,public equipeService:EquipeService,public invitationService:InvitationService,public userService:UserService,public dialogRef: MatDialogRef<ModalConfirmingLeavingEquipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.leader = this.data.leader;
  }

  onConfirmClick(){
    if(this.leader == true){
      this.equipeService.deleteEquipeWithRemovingUserKey(this.data.equipe.idEquipe).subscribe(data => {console.log("equipe deleted is : ",data);this.dialogRef.close();this.router.navigateByUrl("/landing/invitationsReceived")})
    }
    else if(this.leader != true){
      this.userService.leaveTeam(this.data.user).subscribe(data => {console.log("team left : ",data);this.dialogRef.close();this.router.navigateByUrl("/landing/invitationsReceived")})
    }
  }

  onNoClick(){
    this.dialogRef.close();
  }

}
