import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  {path:'', component: UsersComponent},
  {path:'new', component:UserFormComponent},
  {path:'detail/:id', component:UserDetailsComponent},
  {path:'update/:id', component:UserFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
