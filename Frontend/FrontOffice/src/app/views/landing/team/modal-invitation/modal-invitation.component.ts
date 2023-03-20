import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { InvitationService } from 'src/app/services/invitation.service';
import { User } from 'src/app/models/User';
import { Invitation } from 'src/app/models/Invitation';
import { EquipeService } from 'src/app/services/equipe.service';
import { Equipe } from 'src/app/models/Equipe';



@Component({
  selector: 'app-modal-invitation',
  templateUrl: './modal-invitation.component.html',
  styleUrls: ['./modal-invitation.component.css']
})
export class ModalInvitationComponent implements OnInit {

  dataForm: any
  invitationForm!: FormGroup;
  invitationReceiver!: User;
  visible = true;
  dismissible = true;
  repeatedInvitation = false;
  equipeOfSender!:Equipe;
  equipeOfReceiver!:Equipe;
  receiver!:User;
  invitationsSent!:Invitation[]


  constructor(public equipeService:EquipeService,public invitationService:InvitationService,public userService:UserService,public dialogRef: MatDialogRef<ModalInvitationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {

    this.invitationForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  sendInvitation(){
    if(!this.invitationForm.valid)
    {
      console.log("not valid !!")
    }
    else
    {
      this.userService.getUserByEmail(this.invitationForm.value.email).subscribe(data => {
        this.receiver = data;
        if (data != null)
        {
          this.invitationReceiver = data;
          this.invitationService.getInvitationSent(this.data.user).subscribe(data => {
            this.invitationsSent = data
            console.log("after setting invitationsSent with data of : ",this.invitationsSent)
            this.equipeService.getEquipeByUser(this.data.user).subscribe(data => {
              this.equipeOfSender = data;
              this.equipeService.getEquipeByUser(this.receiver).subscribe(data => {
                this.equipeOfReceiver = data;
                if(this.equipeOfSender == this.equipeOfReceiver)
                {
                  console.log("inside the condition equipe")
                  this.repeatedInvitation = true;
                }
                else{
                  console.log("starting the forEach")
                  let numberOfInvitationsSent = this.invitationsSent.length
                  console.log("length of invitation is = ",numberOfInvitationsSent)
                  this.invitationsSent.forEach(invitation => {
                    this.userService.getReceiverOfInvitation(invitation.idInvitation).subscribe(data => {
                      numberOfInvitationsSent--;
                      if (data.email == this.invitationReceiver.email)
                      {
                        console.log("inside the condition")
                        this.repeatedInvitation = true;
                      }
                      if(numberOfInvitationsSent == 0 && this.repeatedInvitation == false){
                        this.invitationService.sendInvitation(this.data.user,this.invitationForm.value.email).subscribe(data => {console.log("the send invitation service returned : ",data);this.dialogRef.close();})
                      }
                      
                    })
                  })
                  
                }
              })
            })
            /*data.forEach(invitation => {
              this.userService.getReceiverOfInvitation(invitation.idInvitation).subscribe(data => {
                if (data.email == this.invitationReceiver.email)
                {
                  console.log("inside the condition")
                  this.repeatedInvitation = true;
                }
              })
            })*/
              
            
          console.log("email got from form : ",this.invitationForm.value.email)
          console.log("the user transfered from a compoenent to another : ",this.data.user)
          
          
          
          })
          
        }
      })
    }
    
  }

}
