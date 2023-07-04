import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  logIn!: FormGroup;
  userNotVerified = false;
  userNotFound = false;
  somethingWentWrong = false;
  user!:User;
  logInValue!:any;
  forgotPasswordError = "";
  forgotPasswordAlertMessage = "";
  forgotPasswordAlert = false;
  alertWarning = false;
  alertInfo = false;
  catchForgotPasswordError = "";
  badCredentials = false;


  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    

    this.logIn = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.minLength(3), Validators.email]),
      password: new FormControl('', Validators.required),
      
    });
  }

  get fs() {
    return this.logIn.controls;
  }


  onSubmit(){
    //console.log(typeof(this.logIn.value));
    if(this.logIn.valid)
    {
      this.logInValue = this.logIn.value;
      this.authService.login(this.logIn.value).subscribe(
        data => {
          console.log("data coming from singin api : ",data)
          if(data.message == "User exists but not valid")
          {
            this.userNotVerified = true;
          }
          else if(data.message == "User does not exist")
          {
            this.userNotFound = true;
          }
          else
          {
            this.tokenStorage.saveToken(data.accessToken);
            this.tokenStorage.saveUser(data.email);
            //console.log(this.tokenStorage.getToken());
            this.router.navigateByUrl('/landing');
          }
        },
        err => {
          if(err.error.message == "Bad credentials")
          {
            this.badCredentials = true;
          }
          else
          {
            this.somethingWentWrong = true;
          }
          console.log("error catched : ",err)
          
        }
      );
    }
  }


  resendVerificationLink(){
    this.authService.sendEmailVerification(this.logInValue).subscribe(data => console.log("email sent"))
  }


  forgotPasswordHandler(){
    if(!(this.logIn.controls['email'].errors && this.logIn.controls['email'].errors['required']))
    {
      if(!(this.logIn.controls['email'].errors && this.logIn.controls['email'].errors['email']))
      {
        this.forgotPasswordError = ""
        this.authService.processForgotPassword(this.logIn.value.email).subscribe(data => {
          console.log("link sent !!! ")
          console.log("data : ",data)
          if(data.message === "User not found")
          {
            this.catchForgotPasswordError = "User not found"
            this.forgotPasswordAlert = true;
            this.forgotPasswordAlertMessage = "the email entered does not exist."
            this.alertInfo = false
            this.alertWarning = true
          }
          else{
            this.forgotPasswordAlert = true;
            this.forgotPasswordAlertMessage = "Check your email we have sent you a link to reset your password."
            this.alertInfo = true
            this.alertWarning = false
          }

        },err=>{
          this.catchForgotPasswordError = err.status
          console.log("error catched : ",this.catchForgotPasswordError)
          
          console.log(err)
        })
        setTimeout(()=> {
          console.log("set timeout : ",this.catchForgotPasswordError)
          if(this.catchForgotPasswordError == "")
          {
            this.forgotPasswordAlert = true;
            this.forgotPasswordAlertMessage = `Check your email a link to reset your password will be sent to you <strong style='color: #0c5460'> in a minute</strong>`
            this.alertInfo = true
            this.alertWarning = false
          }
        },1000)
      }
      else
      this.forgotPasswordError = "*Email must be of format like .....@gmail.com"
    }
    else
      this.forgotPasswordError = "*email is required for forgot password link"
  }



}
