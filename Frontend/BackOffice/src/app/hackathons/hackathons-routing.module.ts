import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HackathonsComponent } from './hackathons.component';
import { HackathonDetailsComponent } from './hackathon-details/hackathon-details.component';
import { hackathonFormComponent } from './hackathon-form/hackathon-form.component';

const routes: Routes = [
  {path:'', component:HackathonsComponent},
  {path:'new', component:hackathonFormComponent},
  {path:'detail/:id', component:HackathonDetailsComponent},
  {path:'update/:id', component:hackathonFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HackathonsRoutingModule { }
