import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/landing/home/home.component';

const routes: Routes = [
  {path:'',component:HomeComponent, children: [
      {
        path: 'landing',
        loadChildren: () => import('./views/landing/landing.module').then(m => m.LandingModule)
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
