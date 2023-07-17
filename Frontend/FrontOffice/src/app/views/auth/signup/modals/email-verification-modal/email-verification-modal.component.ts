import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-email-verification-modal',
  templateUrl: './email-verification-modal.component.html',
  styleUrls: ['./email-verification-modal.component.css']
})
export class EmailVerificationModalComponent {

  messageTitleToDisplay?:String
  messageToDisplay?:String

  constructor(private route:Router,public dialogRef: MatDialogRef<EmailVerificationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.messageTitleToDisplay = this.data.messageTitle;
      this.messageToDisplay = this.data.message;
    }

    onOkClick(): void {
      if(this.data.messageTitle == "Verify your email")
      this.route.navigateByUrl("/auth")
      this.dialogRef.close();
    }

}
