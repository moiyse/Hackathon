import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './views/landing/home/home.component';

const routes: Routes = [
  {path:'auth',loadChildren: () => import('./views/auth/auth.module').then(m => m.AuthModule)},
  {path:'', children: [
      {path:'', redirectTo:'landing',pathMatch:'full'},
      {
        path: 'landing',
        loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule),
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
