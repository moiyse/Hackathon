import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackathonsRoutingModule } from './hackathons-routing.module';
import { HackathonsComponent } from './hackathons.component';
import { hackathonFormComponent } from './hackathon-form/hackathon-form.component';
import { HackathonDetailsComponent } from './hackathon-details/hackathon-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
  declarations: [
    HackathonsComponent,
    hackathonFormComponent,
    HackathonDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HackathonsRoutingModule,
    CKEditorModule
  ]
})
export class HackathonsModule { }
