import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HackathonsComponent } from './hackathons.component';

const routes: Routes = [
  {path:'', component:HackathonsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HackathonsRoutingModule { }
