import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.css']
})
export class EmailValidationComponent implements OnInit {

  emailVerified!:Boolean;
  titleToDisplay!:String;
  messageToDisplay!:string;
  buttonMessageToDisplay!:String;
  titleStyle!:any;
  routerLink!:any;

  constructor(private authService:AuthService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let code = this.activatedRoute.snapshot.params["code"];
    this.authService.verifyEmailVerfication(code).subscribe(data => {
      console.log("result of verify email : ",data);
      if(data == "verify_success")
      {
        this.titleToDisplay = "Welcome"
        this.messageToDisplay = "Your account has been successfuly verified"
        this.buttonMessageToDisplay = "Signin to your account"
        this.routerLink = "/auth"
        this.titleStyle = "color: rgb(0, 135, 255)"
      }
      else if (data == "account_already_valid")
      {
        this.titleToDisplay = "Welcome again"
        this.messageToDisplay = "Your account was already verified"
        this.buttonMessageToDisplay = "Signin to your account"
        this.routerLink = "/auth"
        this.titleStyle = "color: rgb(0, 135, 255)"
      }
      else if (data == "email_is_already_valid")
      {
        this.titleToDisplay = "Welcome again"
        this.messageToDisplay = "This email has already been validated"
        this.buttonMessageToDisplay = "Signin to your account"
        this.routerLink = "/auth"
        this.titleStyle = "color: rgb(0, 135, 255)"
      }
      else
      {
        this.titleToDisplay = "Something went wrong"
        this.messageToDisplay = "Validation link is expired or account already verified"
        this.buttonMessageToDisplay = "Signin to your account"
        this.routerLink = "/auth"
        this.titleStyle = "color:rgb(255, 58, 58)"
      }
    },err=>{
      this.titleToDisplay = "Something went wrong"
      this.messageToDisplay = "Something went wrong while verifying your account"
      this.buttonMessageToDisplay = "Back to signing up"
      this.routerLink = "/auth/signup"
      this.titleStyle = "color:rgb(255, 58, 58)"
    })

  }

}
