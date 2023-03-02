import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './profile/profile.component';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ReservationComponent } from './reservation/reservation.component';
import { InvitationsComponent } from './invitations/invitations.component';
import { WorkshopsComponent } from './workshops/workshops.component';
import { authInterceptorProviders } from 'src/app/services/auth.interceptor';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    ReservationComponent,
    InvitationsComponent,
    WorkshopsComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule
  ],
  providers: [authInterceptorProviders],
})
export class LandingModule { }
