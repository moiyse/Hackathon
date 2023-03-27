import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartnerDetailsComponent } from './partner-details/partner-details.component';
import { PartnerFormComponent } from './partner-form/partner-form.component';
import { PartnersComponent } from './partners.component';

const routes: Routes = [
  {path:'', component:PartnersComponent},
  {path:'new', component:PartnerFormComponent},
  {path:'detail/:id', component:PartnerDetailsComponent},
  {path:'update/:id', component:PartnerFormComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PartnersRoutingModule { }
