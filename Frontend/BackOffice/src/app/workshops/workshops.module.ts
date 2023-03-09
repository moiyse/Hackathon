import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkshopsRoutingModule } from './workshops-routing.module';
import { WorkshopsComponent } from './workshops.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { WorkshopFormComponent } from './workshop-form/workshop-form.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    WorkshopsComponent,
    WorkshopDetailsComponent,
    WorkshopFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkshopsRoutingModule,
    SweetAlert2Module,
    CKEditorModule
  ]
})
export class WorkshopsModule { }
