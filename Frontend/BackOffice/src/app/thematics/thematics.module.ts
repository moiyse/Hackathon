import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThematicsRoutingModule } from './thematics-routing.module';
import { ThematicsComponent } from './thematics.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ThematicsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ThematicsRoutingModule
  ]
})
export class ThematicsModule { }