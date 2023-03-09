import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationComponent } from './reservation/reservation.component';
import { WorkshopsComponent } from './workshops/workshops.component';

const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'home' },
  { path:'home',component:HomeComponent },
  { path:'contact',component:ContactComponent},
  { path:'about',component:AboutComponent},
  { path:'reservation',component:ReservationComponent},
  { path:'workshops',component:WorkshopsComponent},
  { path:'invitations',component:InvitationsComponent},
  { path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
