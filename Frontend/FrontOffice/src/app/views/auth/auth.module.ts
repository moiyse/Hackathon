import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { authInterceptorProviders } from 'src/app/services/auth.interceptor';
import { EmailValidationComponent } from './email-validation/email-validation.component';
import { EmailVerificationModalComponent } from './signup/modals/email-verification-modal/email-verification-modal.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    EmailValidationComponent,
    EmailVerificationModalComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule
  ],
  providers: [authInterceptorProviders],
})
export class AuthModule { }
