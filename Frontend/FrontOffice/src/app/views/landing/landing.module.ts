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
import { WorkshopsComponent } from './workshops/workshops.component';
import { authInterceptorProviders } from 'src/app/services/auth.interceptor';
import { InvitationsReceivedComponent } from './invitations-received/invitations-received.component';
import { InvitationsSentComponent } from './invitations-sent/invitations-sent.component';
import { TeamComponent } from './team/team.component';
import { ModalInvitationComponent } from './team/modals/modal-invitation/modal-invitation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { ModalTeamCreatingComponent } from './team/modals/modal-team-creating/modal-team-creating.component';
import { ModalConfirmingLeavingEquipeComponent } from './team/modals/modal-confirming-leaving-equipe/modal-confirming-leaving-equipe.component';

@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProfileComponent,
    FooterComponent,
    NavbarComponent,
    ReservationComponent,
    WorkshopsComponent,
    InvitationsReceivedComponent,
    InvitationsSentComponent,
    TeamComponent,
    ModalInvitationComponent,
    ModalTeamCreatingComponent,
    ModalConfirmingLeavingEquipeComponent
  ],
  imports: [
    CommonModule,
    LandingRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    
  ],
  providers: [authInterceptorProviders],
})
export class LandingModule { }
