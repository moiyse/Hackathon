import { Routes } from '@angular/router';
import { CalendarComponent } from '../../calendar/calendar.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'calendar', component: CalendarComponent},
    { path: 'users', loadChildren:()=> import('../../users/users.module').then(x=>x.UsersModule)},
    { path: 'hackathons', loadChildren:()=> import('../../hackathons/hackathons.module').then(x=>x.HackathonsModule)},
    { path: 'workshops', loadChildren:()=> import('../../workshops/workshops.module').then(x=>x.WorkshopsModule)},
    { path: 'teams', loadChildren:()=> import('../../teams/teams.module').then(x=>x.TeamsModule)},
    { path: 'thematics', loadChildren:()=> import('../../thematics/thematics.module').then(x=>x.ThematicsModule)}
];
