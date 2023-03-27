import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SponsorFormComponent } from './sponsor-form/sponsor-form.component';
import { SponsorDetailsComponent } from './sponsor-detail/sponsor-details.component';
import { SponsorsComponent } from './sponsors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SponsorsRoutingModule } from './sponsors-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';



@NgModule({
  declarations: [
    SponsorsComponent,
    SponsorFormComponent,
    SponsorDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SponsorsRoutingModule,
    SweetAlert2Module
  ]
})
export class SponsorsModule { }
