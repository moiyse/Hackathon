import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { WorkshopFormComponent } from './workshop-form/workshop-form.component';
import { WorkshopsComponent } from './workshops.component';

const routes: Routes = [
  {path:'', component:WorkshopsComponent},
  {path:'new', component:WorkshopFormComponent},
  {path:'detail/:id', component:WorkshopDetailsComponent},
  {path:'update/:id', component:WorkshopFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkshopsRoutingModule { }
