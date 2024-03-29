import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { NavbarComponent } from '../navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { InvitationsReceivedComponent } from './invitations-received/invitations-received.component';
import { InvitationsSentComponent } from './invitations-sent/invitations-sent.component';
import { ProfileComponent } from './profile/profile-settings/profile.component';
import { ProfileViewComponent } from './profile/profile-view/profile-view.component';
import { ReservationComponent } from './reservation/reservation.component';
import { TeamComponent } from './team/team.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { QrcodeComponent } from './qrcode/qrcode.component';

const routes: Routes = [
  { path:'',pathMatch:'full',redirectTo:'home' },
  { path:'home',component:HomeComponent},
  { path:'contact',component:ContactComponent},
  { path:'about',component:AboutComponent},
  { path:'reservation',component:ReservationComponent,canActivate:[AuthGuard]},
  { path:'workshops',component:WorkshopsComponent},
  { path:'invitationsSent',component:InvitationsSentComponent,canActivate:[AuthGuard]},
  { path:'invitationsReceived',component:InvitationsReceivedComponent,canActivate:[AuthGuard]},
  { path:'team',component:TeamComponent,canActivate:[AuthGuard]},
  { path:'profile',component:ProfileViewComponent,canActivate:[AuthGuard]},
  { path:'profileSettings',component:ProfileComponent,canActivate:[AuthGuard]},
  { path:'qrcode',component:QrcodeComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
