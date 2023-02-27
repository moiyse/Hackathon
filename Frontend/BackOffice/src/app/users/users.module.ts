import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    SweetAlert2Module
  ]
})
export class UsersModule { }
