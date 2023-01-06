import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HackathonsRoutingModule } from './hackathons-routing.module';
import { HackathonsComponent } from './hackathons.component';


@NgModule({
  declarations: [
    HackathonsComponent
  ],
  imports: [
    CommonModule,
    HackathonsRoutingModule
  ]
})
export class HackathonsModule { }
