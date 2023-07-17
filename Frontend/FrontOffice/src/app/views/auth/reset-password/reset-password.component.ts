import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Je } from 'src/app/models/Je';
import { AuthService } from 'src/app/services/auth.service';
import { JeService } from 'src/app/services/je.service';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  resetForm! : FormGroup;
  confirmPasswordCheck = true;
  passwordValue!:String;
  confirmPasswordValue!:String;
  token!:any

  constructor(private route:ActivatedRoute,private authService: AuthService,private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      console.log(this.token);
    });
    this.resetForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  get f() {
    return this.resetForm.controls;
  }

  onSubmit(){
    
    this.authService.processResetPassword(this.token,this.passwordValue).subscribe(data => {console.log("data")},err => {console.log("error : ",err)})
  }

  confirmPasswordOnChange(){
    console.log("here")
    if(this.passwordValue != this.confirmPasswordValue)
      this.confirmPasswordCheck = false
      else 
      this.confirmPasswordCheck = true
  }




}
