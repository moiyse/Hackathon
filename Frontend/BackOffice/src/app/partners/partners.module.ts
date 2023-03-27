import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';
import { PartnersComponent } from './partners.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PartnersRoutingModule } from './partners-routing.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { PartnerFormComponent } from './partner-form/partner-form.component';



@NgModule({
  declarations: [
    PartnersComponent,
    PartnerDetailsComponent,
    PartnerFormComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PartnersRoutingModule,
    SweetAlert2Module
  ]
})
export class PartnersModule { }
