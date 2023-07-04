import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'emailValidation/:code',component:EmailValidationComponent},
  {path:'resetPassword',component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
