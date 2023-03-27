import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorDetailsComponent } from './sponsor-detail/sponsor-details.component';
import { SponsorFormComponent } from './sponsor-form/sponsor-form.component';
import { SponsorsComponent } from './sponsors.component';

const routes: Routes = [
  {path:'', component:SponsorsComponent},
  {path:'new', component:SponsorFormComponent},
  {path:'detail/:id', component:SponsorDetailsComponent},
  {path:'update/:id', component:SponsorFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorsRoutingModule { }
